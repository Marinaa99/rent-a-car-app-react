import React from 'react';
import {useTranslation} from 'react-i18next';

import Input from "../../../../components/formFields/input/Input.jsx";
import SubmitButton from "../../../../components/buttons/submitButton/SubmitButton.jsx";
import Select from "../../../../components/formFields/select/Select.jsx";
import classes from "../../Reservation.module.scss";

const AddReservationFieldsForm = ({
                                      control,
                                      errors,
                                      vehicle,
                                      computedPrice,
                                      customerOptions,
                                      cityOptions,
                                      handleSubmit,
                                      onSubmit
                                  }) => {

    const {t} = useTranslation();

    return (
        <div className={classes["form-fields"]}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>{t('vehicleDetails')}</h3>
                <p><span>{t('form.plateNumber')}:</span> {vehicle.plate_number}</p>
                <p><span>{t('form.vehicleType')}:</span> {vehicle.type}</p>
                <p><span>{t('form.productionYear')}:</span> {vehicle.production_year}</p>
                <p><span>{t('form.numberOfSeats')}:</span> {vehicle.number_of_seats}</p>
                <p><span>{t('form.dailyRate')}:</span> {vehicle.daily_rate}</p>
                <Select
                    placeholder="Kupac"
                    name="customer_id"
                    control={control}
                    error={errors?.customer_id?.message}
                    options={customerOptions}
                />
                <Input
                    placeholder={t('table.dateTo')}
                    type="date"
                    name="date_from"
                    control={control}
                    error={errors?.date_from?.message}
                />
                <Input
                    placeholder={t('table.dateFrom')}
                    type="date"
                    name="date_to"
                    control={control}
                    error={errors?.date_to?.message}
                />
                <Select
                    placeholder={t('table.pickupLocation')}
                    name="pickup_location"
                    control={control}
                    error={errors?.pickup_location?.message}
                    options={cityOptions}
                />
                <Select
                    placeholder={t('table.dropOffLocation')}
                    name="drop_off_location"
                    control={control}
                    error={errors?.drop_off_location?.message}
                    options={cityOptions}
                />
                <Input
                    placeholder={t('table.totalPrice')}
                    name="price"
                    control={control}
                    error={errors?.price?.message}
                    type="number"
                    readOnly
                    value={computedPrice}
                />
                <SubmitButton
                    label={t('form.add')}
                />
            </form>
        </div>
    );
};

export default AddReservationFieldsForm;
