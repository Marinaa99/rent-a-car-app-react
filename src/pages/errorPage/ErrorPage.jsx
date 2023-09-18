import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import classes from "./ErrorPage.module.scss";

const ErrorPage = ({ message = "Došlo je do greške!" }) => {
    const navigate = useNavigate();

    return (
        <div className={classes["container"]}>
            <Result
                status="error"
                title="Greška"
                subTitle={message}
                extra={[
                    <Button type="primary" key="login" onClick={() => navigate('/login')}>
                        Nazad na login
                    </Button>
                ]}
            />
        </div>
    );
};

export default ErrorPage;
