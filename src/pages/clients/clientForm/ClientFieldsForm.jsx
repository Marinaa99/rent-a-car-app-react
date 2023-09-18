import React from 'react';
import {useTranslation} from "react-i18next";

import Input from "../../../components/formFields/input/Input.jsx";
import SubmitButton from "../../../components/buttons/submitButton/SubmitButton.jsx";
import Select from "../../../components/formFields/select/Select.jsx";
import Textarea from "../../../components/formFields/textarea/Textarea.jsx";
import classes from "../Clients.module.scss";

const ClientFieldsForm = ({
                              control,
                              errors,
                              serverErrors,
                              countryOptions,
                              id,
                              editMode,
                              handleSubmit,
                              onSubmit
                          }) => {
    const { t } = useTranslation();

    return (
        <div className={classes["form-fields"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder={t('form.firstName')}
                name="first_name"
                control={control}
                error={errors?.first_name?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.lastName')}
                name="last_name"
                control={control}
                error={errors?.last_name?.message}
                disabled={id && !editMode}
            />
            <Select
                placeholder={t('form.selectCountry')}
                name="country_id"
                control={control}
                options={countryOptions}
                error={errors?.country_id?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.passportNumber')}
                name="passport_number"
                control={control}
                error={errors?.passport_number?.message}
                disabled={id}
            />
            {serverErrors.passport_number && serverErrors.passport_number.length > 0 &&
                <div className="error">{serverErrors.passport_number[0]}</div>}

            <Input
                placeholder={t('form.phoneNumber')}
                name="phone_number"
                control={control}
                error={errors?.phone_number?.message}
                disabled={id && !editMode}
            />
            <Input
                placeholder={t('form.email')}
                name="email"
                control={control}
                error={errors?.email?.message}
                disabled={id}
            />
            {serverErrors.email && serverErrors.email.length > 0 &&
                <div className="error">{serverErrors.email[0]}</div>}

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
export default ClientFieldsForm;
