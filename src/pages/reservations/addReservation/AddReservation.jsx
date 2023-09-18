import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {vehicleService} from "../../../services/VehicleService.js";

import {useModal} from "../../../hooksState/ModalContext.jsx";
import {useQuery} from "react-query";

import Table from "../../../components/table/Table.jsx";
import SearchField from "../../../components/searchField/SearchField.jsx";
import AddReservationForm from "./addReservationForm/AddReservationForm.jsx";
import AddReservationTableHeader from "./addReservationTableHeader/AddReservationTableHeader.jsx";
import classes from "../../reservations/Reservation.module.scss";


const AddReservation = () => {

    const {t} = useTranslation();
    const {open, close} = useModal();
    const [query, setQuery] = useState("");

    const {data} = useQuery(['vehicles', query], () => vehicleService.getAll(query), {
        enabled: true,
        initialData: [],
    });

    const openForm = (record) => {
        open(t('reservation.reservationFormTitle'),
            <AddReservationForm key={`reservation-${record.id}`} vehicle={record} close={close}/>);
    };

    const header = AddReservationTableHeader(openForm);

    return (
        <>
            <SearchField
                className={classes["search"]}
                placeholder={t('searchPlaceholder')}
                onSearch={(e) => setQuery(e)}
            />
            <Table
                header={header}
                data={data}
                onRowClick={(record) => openForm(record)}
            />
        </>
    );
};

export default AddReservation;

