import React from 'react';
import Input from "../../../components/formFields/input/Input.jsx";
import SubmitButton from "../../../components/buttons/submitButton/SubmitButton.jsx";
import Select from "../../../components/formFields/select/Select.jsx";
import {useTranslation} from "react-i18next";
import classes from "../../clients/Clients.module.scss";
const ReservationFieldsForm = ({
                                   control,
                                   errors,
                                   computedPrice,
                                   id,
                                   reservationData,
                                   editMode,
                                   cityOptions,
                                   handleSubmit,
                                   onSubmit
                               }) => {

    const {t} = useTranslation();

    return (
        <div className={classes["form-fields"]}>

        <form onSubmit={handleSubmit(onSubmit)}>
        {reservationData && (
            <>
                <h3>User Info</h3>
                <p>Name: {reservationData.customer.first_name} {reservationData.customer.last_name}</p>

                <h3>Vehicle Info</h3>
                <p>Plate Number: {reservationData.vehicle.plate_number}</p>
            </>
        )}
        <Input
            name="date_from"
            type="date"
            control={control}
            error={errors?.date_from?.message}
            disabled={id && !editMode}
        />

        <Input
            name="date_to"
            type="date"
            control={control}
            error={errors?.date_to?.message}
            disabled={id && !editMode}
        />

        <Select
            name="pickup_location"
            control={control}
            error={errors?.pickup_location?.message}
            options={cityOptions}
            disabled={id && !editMode}
        />
        <Select
            name="drop_off_location"
            control={control}
            error={errors?.drop_off_location?.message}
            options={cityOptions}
            disabled={id && !editMode}
        />


        <Input
            name="price"
            control={control}
            error={errors?.price?.message}
            readOnly
            type="number"
            value={computedPrice}
            disabled={id && !editMode}
        />

        {(id && editMode) && (
            <SubmitButton
                label={t('form.update')}
            />
        )}
    </form>
        </div>
    );
};


export default ReservationFieldsForm;
