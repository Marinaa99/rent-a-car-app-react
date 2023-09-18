import React from 'react';
import {useTranslation} from 'react-i18next';

import Input from "../../../components/formFields/input/Input.jsx";
import SubmitButton from "../../../components/buttons/submitButton/SubmitButton.jsx";
import Textarea from "../../../components/formFields/textarea/Textarea.jsx";
import classes from "../../vehicles/Vehicle.module.scss";

const VehicleFieldsForm = ({
                               control,
                               errors,
                               id,
                               editMode,
                               handleSubmit,
                               onSubmit
                           }) => {

    const {t} = useTranslation();

    return (
        <div className={classes["form-fields"]}>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={t('form.plateNumber')}
                name="plate_number"
                control={control}
                error={errors.plate_number?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.productionYear')}
                name="production_year"
                control={control}
                error={errors.production_year?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.vehicleType')}
                name="type"
                control={control}
                error={errors.type?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.numberOfSeats')}
                name="number_of_seats"
                control={control}
                error={errors.number_of_seats?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.dailyRate')}
                name="daily_rate"
                control={control}
                error={errors.daily_rate?.message}
                disabled={id && !editMode}
            />
            <Textarea
                placeholder={t('form.note')}
                name="note"
                control={control}
                error={errors?.note?.message}
                disabled={id && !editMode}
            />
            {(!id || editMode) && (
                <SubmitButton
                    label={id ? t('form.update') : t('form.add')}
                />
            )}
        </form>
        </div>
    );
};

export default VehicleFieldsForm;
