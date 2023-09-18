import React, {useState, useEffect} from 'react';

import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';

import {message} from 'antd';
import moment from 'moment';
import {useQueryClient, useQuery, useMutation} from "react-query";

import {userService} from "../../../../services/UserService.js";
import {reservationService} from "../../../../services/ReservationService.js";
import {cityService} from "../../../../services/CityService.js";

import AddReservationFieldsForm from "./AddReservationFieldsForm.jsx";
import {AddReservationFormSchema} from "./AddReservationFormSchema.js";

const AddReservationForm = ({vehicle, close}) => {


    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [computedPrice, setComputedPrice] = useState(0);

    const {data: customers} = useQuery(
        ["customers-data"],
        () => userService.getAll(),
        {
            enabled: true,
            initialData: [],
        }
    );

    const customerOptions = customers.map(user => ({
        value: user.id,
        label: user.first_name,
    }));

    const { data: cities } = useQuery(
        ["cities"],
        () => cityService.getAll(),
        {
            enabled: true,
            initialData: [],
        }
    );

    const cityOptions = cities.map(city => ({
        value: city.id,
        label: city.name,
    }));

    const add = useMutation((data) => reservationService.add(data)
        .then(r => {
            message.success("Succesfully added!");
            queryClient.invalidateQueries("reservations")
            close()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error("There has been an error!")
        }))

    const {
        handleSubmit, control, reset, formState: {errors}, watch, setValue
    } = useForm({
        resolver: yupResolver(AddReservationFormSchema(t)),
        defaultValues: {
            date_from: moment().format('YYYY-MM-DD'),
            date_to: moment().add(7, 'days').format('YYYY-MM-DD'),
        }
    });

    useEffect(() => {
        const formData = {
            date_from: watch('date_from'),
            date_to: watch('date_to'),
            daily_rate: vehicle.daily_rate,
        };
        const price = calculateTotalPrice(formData);
        setComputedPrice(price);
        setValue('price', price);
    }, [watch('date_from'), watch('date_to'), vehicle.daily_rate, setValue]);

    const calculateTotalPrice = (formData) => {
        const startDate = moment(formData.date_from);
        const endDate = moment(formData.date_to);
        const numberOfDays = endDate.isSame(startDate) ? 1 : endDate.diff(startDate, 'days');
        const dailyRate = vehicle.daily_rate;

        if (!isNaN(numberOfDays) && !isNaN(dailyRate)) {
            return (numberOfDays * dailyRate).toFixed(2);
        }
        return 0;
    };

    const onSubmit = (formData) => {
        formData.date_from = moment(formData.date_from).format('YYYY-MM-DD');
        formData.date_to = moment(formData.date_to).format('YYYY-MM-DD');
        formData.total_price = calculateTotalPrice(formData);
        formData.vehicle_id = vehicle.id;
        add.mutate(formData);
    }

    return (
        <>
            <AddReservationFieldsForm
                control={control}
                errors={errors}
                vehicle={vehicle}
                cityOptions={cityOptions}
                computedPrice={computedPrice}
                customerOptions={customerOptions}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </>
    );
};
export default AddReservationForm;
