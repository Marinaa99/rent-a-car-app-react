import React, {useState} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {message} from 'antd';
import { useTranslation } from "react-i18next";

import {userService} from "../../services/UserService.js";

import {useModal} from "../../hooksState/ModalContext.jsx";
import Table from "../../components/table/Table.jsx";
import AddButton from "../../components/buttons/addButton/AddButton.jsx";
import ClientForm from "./clientForm/ClientForm.jsx";
import DeleteModal from "../../components/modal/DeleteModal.jsx";
import SearchField from "../../components/searchField/SearchField.jsx";
import ClientTableHeader from "./clientTableHeader/ClientTableHeader.jsx";
import classes from "./Clients.module.scss";



const Clients = () => {

    const {t} = useTranslation();
    const {open, close} = useModal();
    const [query, setQuery] = useState("");
    const queryClient = useQueryClient();

    const {data} = useQuery(
        ['users', query],
        () => userService.getAll(query),
        {
            enabled: true,
            initialData: [],
        }
    );

    const closeForm = () => {
        close();
    };
    const openForm = (id, editMode = false) => {
        open(t('clients.clientFormTitle'),
            <ClientForm
                key={`client-${id}`}
                id={id}
                editMode={editMode}
                close={closeForm}
            />
        );
    };
    const onDelete = (id) => {
        const handleConfirm = () => {
            deleteClient.mutate(id);
            close();
        };
        open(t('deleteConfirmation'), <DeleteModal onConfirm={handleConfirm} onCancel={close} />);
    };

    const deleteClient = useMutation(
        (data) => userService.delete(data)
            .then(r => {
                message.success(t('message.deleteSuccess'));
                queryClient.invalidateQueries("users");
                close();
            })
            .catch(err => {
                    console.log(err?.response?.data);
                    message.error(t('message.deleteError'));
                }
            )
    );

    const header = ClientTableHeader(openForm, onDelete);

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
                label={t('clients.addClient')}
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

export default Clients;
