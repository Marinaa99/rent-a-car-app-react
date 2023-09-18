import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
    email: yup
        .string()
        .required("Field is required!")
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Field is required!")
        .matches(
            /^[a-zA-Z0-9!#%&]{4,12}$/,
            "Password must be 4-12 characters and can include letters, numbers, and special characters ! # % &"
        ),
});
