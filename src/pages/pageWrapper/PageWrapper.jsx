import React, {useState} from 'react';
import {Layout, Button} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import Header from "../../components/header/Header.jsx";
import MainContent from "../../components/mainContent/MainContent.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import AppFooter from "../../components/appFooter/AppFooter.jsx";
import classes from "./PageWrapper.module.scss";

const {Sider} = Layout;

const PageWrapper = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={classes["container"]}>
            <Sider
                className={classes["sidebar"]}
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="md"
                collapsedWidth="50"
                onBreakpoint={(broken) => setCollapsed(broken)}>
                <div className={classes["menu-icon"]}>
                    <Button
                        type="text"
                        className={classes["button"]}
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </div>
                <Sidebar/>
            </Sider>
            <Layout className={classes["layout"]}>
                <Header/>
                <MainContent>
                    {children}
                </MainContent>

                <AppFooter/>
            </Layout>
        </Layout>
    );
};

export default PageWrapper;
