import React, { useState} from 'react';
import { useTranslation } from 'react-i18next';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQuery, useQueryClient} from "react-query";

import useCountries from "../../../hooks/dataHooks/useCountries.js";
import {ClientFormSchema} from "./ClientFormSchema.js";
import ClientFieldsForm from "./ClientFieldsForm.jsx";
import {userService} from "../../../services/UserService.js";
import {message} from "antd";

const ClientForm = ({id, close, editMode}) => {

    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const {countryOptions} = useCountries();
    const [serverErrors, setServerErrors] = useState({});


    const add = useMutation((data) => userService.add(data)
        .then(r => {
            message.success(t('message.successfullyAdded'));
            setServerErrors({});
            reset();
            queryClient.invalidateQueries("users")
            close();
        })
        .catch(err => {
            console.log(err?.response?.data);
            setServerErrors(err?.response?.data.errors);
            message.error(t('message.errorOccurred'));
        }))

    const edit = useMutation((data) => userService.edit(data)
        .then(r => {
            message.success(t('message.successfullyEdited'));
            queryClient.invalidateQueries("users");
            close();
        })
        .catch(err => {
            console.log(err?.response?.data);
            message.error(t('message.errorOccurred'));
        }))

    const get = (id) => {
        return userService.get(id)
            .then(r => {
                reset(r)
            })
            .catch(err => message.error(t('message.errorOccurred')));
    }

    useQuery(['client', id], () => get(id), {
        enabled: Boolean(id)
    })

    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        resolver: yupResolver(ClientFormSchema(t))
    });
    const onSubmit = (formData) => {
        if (id) {
            const dataForEdit = {
                id: id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_number: formData.phone_number,
                note: formData.note,
                country_id: formData.country_id,
            };
            edit.mutate(dataForEdit)
        } else {
            add.mutate(formData)
        }
    }

    return (
        <>
            <ClientFieldsForm
                control={control}
                errors={errors}
                countryOptions={countryOptions}
                id={id}
                serverErrors={serverErrors}
                editMode={editMode}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}/>
        </>
    );
};
export default ClientForm;


