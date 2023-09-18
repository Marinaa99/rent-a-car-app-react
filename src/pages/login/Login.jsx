import React, {useState} from 'react';

import {useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";

import {authService} from "../../services/AuthService.js";
import {storageService} from "../../services/StorageService.js";
import {storageKeys} from "../../config/config.js";

import {useUserData} from "../../hooksState/UserContext.jsx";

import classes from "./Login.module.scss";

import LoginFieldsForm from "./loginForm/LoginFieldsForm.jsx";
import {LoginFormSchema} from "./loginForm/LoginFormSchema.js";
import car from "../../assets/images/car.png"



const Login = () => {

    const navigate = useNavigate();
    const {refreshUserData} = useUserData();
    const [serverErrors, setServerErrors] = useState({});

    const onSubmit = (formData) => {
        authService.login(formData?.email, formData?.password)
            .then(async r => {
                storageService.set(storageKeys.USER, r.access_token)
                await refreshUserData();
                setTimeout(() => {
                    navigate('/')
                }, 300)
            })
            .catch(err => {
                console.log(err?.response?.data);
                if(err?.response?.data?.message === "Invalid credentials!") {
                    setServerErrors({ general: err?.response?.data?.message });
                } else {
                    setServerErrors(err?.response?.data.errors);
                }
            });
    }

    const {
        handleSubmit, control, reset, formState: {errors}
    } = useForm({
        resolver: yupResolver(LoginFormSchema),

    });

    return (
        <div className={classes["container"]}>
            <div className={classes["first-div"]}></div>
            <div className={classes["second-div"]}></div>

            <div className={classes["overlay"]}>
                <div className={classes["form-container"]}>
                    <h2 className={classes["title"]}>Login your account</h2>
                    <p className={classes["description"]}>Since this is your first trip, you'll need to provide us with some information before you can check out.</p>
                    <LoginFieldsForm
                        control={control}
                        errors={errors}
                        serverErrors={serverErrors}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                    />
                </div>
                <div className={classes["photograph"]}>
                    <img src={car} alt="car"/>
                </div>

            </div>
        </div>
    );

}

export default Login;