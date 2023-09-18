import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {yupResolver} from "@hookform/resolvers/yup";
import {message} from 'antd';
import {useQueryClient, useQuery, useMutation} from "react-query";

import {reservationService} from "../../../services/ReservationService.js";
import {cityService} from "../../../services/CityService.js";
import moment from 'moment';
import ReservationFieldsForm from "./ReservationFieldsForm.jsx";
import {ReservationFormSchema} from "./ReservationFormSchema.js";

const ReservationForm = ({id, close, editMode}) => {

    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [computedPrice, setComputedPrice] = useState(0);

    const get = (id) => {
        return reservationService.get(id)
            .then(res => {
                console.log("API Response:", res);
                reset(res)
                return res
            })
            .catch(err => {
                console.error("API Error:", err);
                message.error(t('message.errorOccurred'));
            });
    }

    const {data: reservationData} = useQuery(
        ['reservation', id],
        () => get(id),
        {
            enabled: Boolean(id)
        }
    );

    const {data: citiesData} = useQuery(
        ["cities-data"],
        () => cityService.getAll(),
        {
            enabled: true,
            initialData: [],
        }
    );

    const cityOptions = citiesData ? citiesData.map(city => ({
        value: city.id,
        label: city.name,
    })) : [];


    const edit = useMutation((data) => reservationService.edit(data)
        .then(r => {
            message.success(t('message.successfullyEdited'));
            queryClient.invalidateQueries("reservations")
            close()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('message.errorOccurred'));
        }))


    const {
        handleSubmit, control, reset, watch, setValue, formState: {errors}
    } = useForm({
        resolver: yupResolver(ReservationFormSchema(t)),

    });

    useEffect(() => {
        if (reservationData) {
            const formData = {
                date_from: watch('date_from'),
                date_to: watch('date_to'),
                daily_rate: reservationData.vehicle.daily_rate,
                pickup_location: reservationData.pickup_location.id,
                drop_off_location: reservationData.drop_off_location.id,
            };
            const price = calculateTotalPrice(formData);
            setComputedPrice(price);
            setValue('price', price);
        }
    }, [watch('date_from'), watch('date_to'), reservationData, setValue]);

    const calculateTotalPrice = (formData) => {
        const startDate = moment(formData.date_from);
        const endDate = moment(formData.date_to);
        const numberOfDays = endDate.isSame(startDate) ? 1 : endDate.diff(startDate, 'days');
        const dailyRate = formData.daily_rate;

        if (!isNaN(numberOfDays) && !isNaN(dailyRate)) {
            return (numberOfDays * dailyRate).toFixed(2);
        }
        return 0;
    };
    const onSubmit = (formData) => {
        formData.pickup_location = typeof formData.pickup_location === "string"
            ? reservationData.pickup_location.id
            : formData.pickup_location;

        formData.drop_off_location = typeof formData.drop_off_location === "string"
            ? reservationData.drop_off_location.id
            : formData.drop_off_location;
        formData.date_from = moment(formData.date_from).format('YYYY-MM-DD');
        formData.date_to = moment(formData.date_to).format('YYYY-MM-DD');

        edit.mutate(formData)
    }

    return (
        <div>
            <ReservationFieldsForm
                control={control}
                errors={errors}
                id={id}
                reservationData={reservationData}
                cityOptions={cityOptions}
                computedPrice={computedPrice}
                editMode={editMode}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </div>
    );
};
export default ReservationForm;
