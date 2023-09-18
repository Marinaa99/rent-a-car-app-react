import React from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import classes from "./Modal.module.scss";
import { useTranslation } from "react-i18next";


import Button from "../buttons/button/Button.jsx";


const DeleteModal = ({ onConfirm, onCancel}) => {
    const {t} = useTranslation();

    return (
        <>
            <div className={classes["container"]}>
                <ExclamationCircleOutlined className={classes["icon"]}/>
                <span>{t('confirmationText')}</span>
            </div>
                <Button
                    className={classes["confirm"]}
                    onClick={onConfirm}
                    label={t('confirmButton')}>

                </Button>
                <Button
                    className={classes["delete"]}
                    onClick={onCancel}
                    label={t('cancelButton')}
                ></Button>
        </>
    )
}


export default DeleteModal;