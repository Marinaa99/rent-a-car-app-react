import React from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import {Button} from "antd";
import classes from "../../table/Table.module.scss";

const ActionButtons = ({data, openForm, onDelete}) => {

    return (
        <div className={classes["container"]}>
            <Button
                className={classes["edit-btn"]}
                icon={<EditOutlined />}
                onClick={(e) => {
                    e.stopPropagation();
                    openForm(data.id, true);
                }}
            />
            <Button
                className={classes["delete-btn"]}
                icon={<DeleteOutlined />}
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(data.id);
                }}
            />
        </div>
    );
};

export default ActionButtons;
