import React from 'react';
import {Layout, theme} from 'antd';
import classes from "./MainContent.module.scss";


const {Content} = Layout;

const MainContent = ({children}) => {
    const {token: {colorBgContainer}} = theme.useToken();

    return (
        <Content className={classes["container"]}>
            <div className={classes["main"]}>
                {children}
            </div>
        </Content>
    );
};

export default MainContent;
