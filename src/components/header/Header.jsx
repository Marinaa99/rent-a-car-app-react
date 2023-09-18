import React from 'react';
import {Menu} from 'antd';
import {useUserData} from "../../hooksState/UserContext.jsx";
import DropdownMenu from "../../components/menu/dropdownMenu/DropdownMenu.jsx";
import ClientForm from "../../pages/clients/clientForm/ClientForm.jsx";
import VehicleForm from "../../pages/vehicles/vehicleForm/VehicleForm.jsx";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../hooksState/ModalContext.jsx";
import logo from "../../assets/images/logo.png"
import classes from "./Header.module.scss";


const Header = () => {
    const {userData, logout} = useUserData();
    const {open, close} = useModal();
    const navigate = useNavigate();

    const openClientForm = () => {
        open("Dodaj klijenta", <ClientForm close={closeClientForm}/>);
    };

    const openVehicleForm = () => {
        open("Dodaj vozilo", <VehicleForm close={closeVehicleForm}/>);
    };

    const closeClientForm = () => {
        close();
        navigate("/clients");
    }

    const closeVehicleForm = () => {
        close();
        navigate("/vehicles");
    }

    const menuItems = [
        {
            label: <img className={classes["logo"]}
                        src={logo} alt="logo"
            />,
            key: "logo",

        },
        {
            label: <DropdownMenu
                className={classes["dropdown"]}
                userData={userData}
                openClientForm={openClientForm}
                openVehicleForm={openVehicleForm}
                logout={logout}
            />,
            key: "user-dropdown"
        }
    ];

    return (
        <Menu className={classes["header"]} mode="horizontal" items={menuItems}/>

    );
};


export default Header;
