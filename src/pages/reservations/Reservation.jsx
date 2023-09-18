import React, {useState} from "react";
import {message} from 'antd';
import {useTranslation} from "react-i18next";
import {useQueryClient, useQuery, useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

import {reservationService} from "../../services/ReservationService.js";

import {useModal} from "../../hooksState/ModalContext.jsx";

import Table from "../../components/table/Table.jsx";
import AddButton from "../../components/buttons/addButton/AddButton.jsx";
import DeleteModal from "../../components/modal/DeleteModal.jsx";
import ReservationForm from "./reservationForm/ReservationForm.jsx";
import ReservationTableHeader from "./reservationTableHeader/ReservationTableHeader.jsx";
import DatePicker from "../../components/formFields/datePicker/DatePicker.jsx"
import classes from "../reservations/Reservation.module.scss";

const Reservation = () => {

    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const {open, close} = useModal();
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const navigate = useNavigate();

    const { data } = useQuery(
        ['reservations', { dateFrom, dateTo }],
        () => reservationService.getAll({ dateFrom, dateTo }),
        {
            enabled: true,
            initialData: [],
        }
    );
    const handleDateChange = (dates, dateStrings) => {
        setDateFrom(dateStrings[0]);
        setDateTo(dateStrings[1]);
    };
    const deleteReservation = useMutation((data) => reservationService.delete(data)
        .then(r => {
            message.success(t('message.deleteSuccess'));
            queryClient.invalidateQueries("reservations")
            close()
        })
        .catch(err => {
                console.log(err?.response?.data)
            message.error(t('message.deleteError'));
            }
        ))

    const onDelete = (id) => {
        const handleConfirm = () => {
            deleteReservation.mutate(id)
            close();
        };

        open('Delete Confirmation', <DeleteModal onConfirm={handleConfirm} onCancel={close}/>);
    };

    const closeForm = () => {
        close();
    }

    const openForm = (id, editMode = false) => {
        open(t('reservation.reservationFormTitle'),
            <ReservationForm key={`reservation-${id}`}
                             id={id}
                             editMode={editMode}
                             close={closeForm}
            />
        )
    }
    const header = ReservationTableHeader(openForm, onDelete);

    return (
        <>
            <div className={classes["container"]}>
            <DatePicker
                className={classes["datepicker"]}
                onChange={handleDateChange}
            />
            <AddButton
                className={classes["add-btn"]}
                onClick={() => navigate("/add/reservation")}
                label={t('reservation.addReservation')}
            />
            </div>
            <Table
                header={header}
                data={data}
                onRowClick={(record) => openForm(record.id)}
            />
        </>
    );
};

export default Reservation;


