import React from 'react';
import Input from "../../../components/formFields/input/Input.jsx";
import SubmitButton from "../../../components/buttons/submitButton/SubmitButton.jsx";
import classes from "../Login.module.scss";

const LoginFieldsForm = ({
                             control,
                             errors,
                             serverErrors,
                             handleSubmit,
                             onSubmit
                         }) => (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
        {serverErrors.general &&
            <div className={classes["error"]}>{serverErrors.general}</div>}
        <div>
            <Input
                placeholder="Email"
                name="email"
                control={control}
                error={errors?.email?.message}
            />

        </div>
        <div>
            <Input
                placeholder="Password"
                type="password"
                name="password"
                control={control}
                error={errors?.password?.message}
            />
        </div>

        <div className={classes["div-btn"]}>
            <SubmitButton className={classes["button"]} label={"Login"}/>
        </div>
    </form>
);

export default LoginFieldsForm;
