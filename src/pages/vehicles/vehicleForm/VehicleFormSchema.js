import * as yup from "yup";

export const VehicleFormSchema = (t) => {

    return yup.object().shape({
        plate_number: yup.string()
            .required(t('validation.required'))
            .matches(/^[A-Za-z0-9\s-]+$/, t('validation.plateNumberRegex'))
            .min(5, t('validation.plateNumberMin'))
            .max(15, t('validation.maxLength15')),

        production_year: yup.number()
            .required(t('validation.required'))
            .typeError(t('validation.productionYearTypeError'))
            .min(1990, t('validation.productionYearMin'))
            .max(new Date().getFullYear(), t('validation.productionYearMax', { year: new Date().getFullYear() })),

        type: yup.string()
            .required(t('validation.required'))
            .max(50, t('validation.typeMaxLength')),

        number_of_seats: yup.number()
            .required(t('validation.required'))
            .typeError(t('validation.numberOfSeatsTypeError'))
            .min(1, t('validation.numberOfSeatsMin'))
            .max(10, t('validation.numberOfSeatsMax')),

        daily_rate: yup.number()
            .required(t('validation.required'))
            .typeError(t('validation.dailyRateTypeError'))
            .min(3, t('validation.dailyRateMin'))
            .max(1000, t('validation.dailyRateMax')),

        note: yup.string().trim()
            .required(t('validation.required'))
            .min(3, t('validation.minLength3'))
            .max(500, t('validation.maxLength500'))
    });
};
