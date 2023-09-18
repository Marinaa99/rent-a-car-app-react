import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {message} from "antd";
import {useTranslation} from "react-i18next";

import {vehicleService} from "../../services/VehicleService.js";

import {useModal} from "../../hooksState/ModalContext.jsx";

import Table from "../../components/table/Table.jsx";
import AddButton from "../../components/buttons/addButton/AddButton.jsx";
import VehicleForm from "./vehicleForm/VehicleForm.jsx";
import DeleteModal from "../../components/modal/DeleteModal.jsx";
import VehicleTableHeader from "./vehicleTableHeader/VehicleTableHeader.jsx";
import SearchField from "../../components/searchField/SearchField.jsx";
import classes from "../vehicles/Vehicle.module.scss";


const Vehicle = () => {

    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const {open, close} = useModal();
    const [query, setQuery] = useState("")

    const {data} = useQuery(['vehicles', query],
        () => vehicleService.getAll(query), {
            enabled: true,
            initialData: [],
        });

    const deleteVehicle = useMutation((data) => vehicleService.delete(data)
        .then(r => {
            message.success(t('message.deleteSuccess'));
            queryClient.invalidateQueries("vehicles")
            close()
        })
        .catch(err => {
                console.log(err?.response?.data)
            message.error(t('message.deleteError'));
            }
        ))

    const onDelete = (id) => {
        const handleConfirm = () => {
            deleteVehicle.mutate(id)
            close();
        };

        open(t('deleteConfirmation'), <DeleteModal onConfirm={handleConfirm} onCancel={close}/>);
    };

    const closeForm = () => {
        close();
    }

    const openForm = (id, editMode = false) => {
        open(t('vehicle.vehicleFormTitle'),
            <VehicleForm key={`vehicles-${id}`}
                         id={id}
                         editMode={editMode}
                         close={closeForm}/>
        )
    }

    const header = VehicleTableHeader(openForm, onDelete);

    return (
        <>
            <div className={classes["container"]}>
            <SearchField
                className={classes["search"]}
                placeholder={t('searchPlaceholder')}
                onSearch={(e) => setQuery(e)}
            />
            <AddButton
                className={classes["add-btn"]}
                onClick={() => openForm(null)}
                label={t('vehicle.addVehicle')}/>
            </div>

            <Table header={header}
                   data={data}
                   onRowClick={(record) => openForm(record.id)}
            />
        </>
    )
}

export default Vehicle;