import * as yup from "yup";

const phoneRegExp = /^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,4}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){2,4}\d{1,4}$/;
const onlyLettersRegExp = /^[a-zA-Z\s]*$/;
const onlyNumbersRegExp = /^\d+$/;

export const ClientFormSchema = (t) => {

    return yup.object().shape({

        first_name: yup.string().trim()
            .required(t("validation.required"))
            .matches(onlyLettersRegExp, t('validation.onlyLetters'))
            .min(2, t("validation.minLength2"))
            .max(50, t("validation.maxLength50")),

        last_name: yup.string().trim()
            .required(t("validation.required"))
            .matches(onlyLettersRegExp, t('validation.onlyLetters'))
            .min(2, t("validation.minLength2"))
            .max(50, t("validation.maxLength50")),

        passport_number: yup.string().trim()
            .required(t("validation.required"))
            .matches(onlyNumbersRegExp, t('validation.onlyNumbers'))
            .min(8, t("validation.minLength8"))
            .max(15, t("validation.maxLength15")),

        phone_number: yup.string().trim()
            .required(t("validation.required"))
            .matches(phoneRegExp, t('validation.invalidPhone'))
            .min(8, t("validation.minLength8"))
            .max(15, t("validation.maxLength15")),

        email: yup.string().trim()
            .required(t("validation.required"))
            .email(t("validation.invalidEmail")),

        country_id: yup.number()
            .required(t("validation.required")),

        note: yup.string().trim()
            .min(3, t("validation.minLength3"))
            .max(500, t("validation.maxLength500")),
    });
};
