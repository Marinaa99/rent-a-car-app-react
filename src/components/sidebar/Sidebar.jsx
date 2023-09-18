import React from 'react';
import {Menu} from 'antd';
import {FileSearchOutlined, TeamOutlined, CarOutlined,LeftCircleOutlined,DownCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import classes from "../../components/sidebar/Sidebar.module.scss";
import {useUserData} from "../../hooksState/UserContext.jsx";
const Sidebar = () => {
    const {userData} = useUserData();

    const items = [
        {
            key: '1',
            icon: <TeamOutlined/>,
            label: <Link to="/clients">Klijenti</Link>
        },
        {
            key: '2',
            icon: <CarOutlined/>,
            label: <Link to="/vehicles">Vozila</Link>
        },
        {
            key: '3',
            icon: <FileSearchOutlined/>,
            label: <Link to="/reservations">Rezervacije</Link>
        },
        {
            key: '4',
            icon: <CarOutlined/>,
            label: <Link to="/clients/reservations">Sve Rezervacije</Link>
        },
        {
            key: '5',
            icon: <LeftCircleOutlined/>,
            label: <Link to="/previous/reservations">Prethodne Rezervacije</Link>
        },
        {
            key: '6',
            icon: <DownCircleOutlined/>,
            label: <Link to="/current/reservations">Trenutne Rezervacije</Link>
        },
        {
            key: '7',
            icon: <RightCircleOutlined />,
            label: <Link to="/future/reservations">Buduce Rezervacije</Link>
        }
    ]
    const filteredItems = items.filter(item => {
        if (userData.role === 1) {
            return ['1', '2', '3'].includes(item.key);
        }
        if (userData.role === 2) {
            return ['4', '5', '6','7'].includes(item.key);
        }
        return false;
    });

    return (
        <Menu className={classes["menu"]} mode="inline" defaultSelectedKeys={['1']} items={filteredItems} />
    );

}
export default Sidebar;
