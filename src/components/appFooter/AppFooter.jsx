import React from 'react';
import { Layout } from 'antd';
import classes from "./AppFooter.module.scss";
import { useTranslation } from "react-i18next";


const { Footer } = Layout;

const AppFooter = () => {
    const {t} = useTranslation();

    return (
        <Footer  className={classes["footer"]}
        >
            ©{t('copyright')}
        </Footer>
    );
};

export default AppFooter;
