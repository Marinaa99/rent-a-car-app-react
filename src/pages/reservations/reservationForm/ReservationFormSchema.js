import * as yup from "yup";

export const ReservationFormSchema = (t) => {

    return yup.object().shape({

        date_from: yup.date().required(t("validation.required")),
        date_to: yup
            .date()
            .required(t("validation.required"))
            .min(yup.ref("date_from"), t("validation.endDateAfterStartDate")),
        pickup_location: yup.string().required(t("validation.pickupLocationRequired")),
        drop_off_location: yup.string().required(t("validation.dropOffLocationRequired")),
        price: yup
            .number()
            .required(t("validation.priceRequired"))
            .typeError(t("validation.priceTypeError"))
            .min(1, t("validation.priceMin"))
    });
};
