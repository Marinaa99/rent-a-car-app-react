import React from 'react';
import {Avatar, Dropdown, Space} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import en from "../../../assets/images/en.png"
import mne from "../../../assets/images/mne.png"

const DropdownMenu = ({userData, openClientForm, openVehicleForm, logout}) => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const getLanguageItems = () => {
        return [
            {key: "en", label: (<span><img src={en} alt="En flag"/></span>), onClick: () => changeLanguage('en')},
            {key: "mne", label: (<span><img src={mne} alt="Mne flag"/></span>), onClick: () => changeLanguage('mne')}
        ];
    };

    const items = [

        {
            key: "add-user",
            label: t('menu.addNewUser'),
            onClick: openClientForm
        },
        {
            key: "add-vehicle",
            label: t('menu.addNewVehicle'),
            onClick: openVehicleForm
        },
        {
            key: "add-reservation",
            label: <NavLink to="/add/reservation">{t('menu.addNewReservation')}</NavLink>
        },
        {
            key: "language",
            label: t('menu.language'),
            children: getLanguageItems()
        },
        {
            key: "logout",
            label: t('menu.logout'),
            onClick: logout
        }
    ];

    return (
        <>

            <Space>
                <Avatar style={{backgroundColor:"#FABB18"}} icon={<UserOutlined/>}/>
                <span>{userData?.first_name} {userData?.last_name}</span>
                <Dropdown
                    menu={{items}}
                    placement="bottom"
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <DownOutlined style={{color:"#FABB18"}}/>
                    </a>
                </Dropdown>
            </Space>
        </>
    );

}

export default DropdownMenu;
