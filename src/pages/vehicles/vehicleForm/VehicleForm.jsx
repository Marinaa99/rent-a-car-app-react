import React from 'react';
import { useTranslation } from 'react-i18next';
import {useMutation, useQuery, useQueryClient} from "react-query";
import { message } from "antd";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { vehicleService } from "../../../services/VehicleService.js";

import VehicleFieldsForm from "./VehicleFieldsForm.jsx";
import { VehicleFormSchema } from "./VehicleFormSchema.js";


const VehicleForm = ({id, close, editMode}) => {

    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const add = useMutation((data) => vehicleService.add(data)
        .then(r => {
            message.success(t('message.successfullyAdded'));
            queryClient.invalidateQueries("vehicles")
            close()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('message.errorOccurred'));
        }))

    const edit = useMutation((data) => vehicleService.edit(data)
        .then(r => {
            message.success(t('message.successfullyEdited'));
            queryClient.invalidateQueries("vehicles")
            close()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('message.errorOccurred'));
        }))

    const get = (id) => {
        return vehicleService.get(id)
            .then(r => {
                reset(r)
            })
            .catch(err => message.error(t('message.errorOccurred')));
    }

    useQuery(['vehicle', id], () => get(id), {
        enabled: Boolean(id)
    })
    const {
        handleSubmit, control, reset, formState: {errors}
    } = useForm({
        resolver: yupResolver(VehicleFormSchema(t)),
    });

    const onSubmit = (formData) => {
        if (id) {
            edit.mutate(formData)
        } else {
            add.mutate(formData)
        }
    }

    return (
        <>
            <VehicleFieldsForm
                control={control}
                errors={errors}
                id={id}
                editMode={editMode}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </>
    )
}


export default VehicleForm;