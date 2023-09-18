import React from "react";
import { Button } from "antd";
import {PlusOutlined} from "@ant-design/icons";

const AddButton = ({onClick, className = "", label}) => {
    return <Button htmlType="button"
                   icon={<PlusOutlined />}
                   onClick={(e) => {
                       e.preventDefault();
                       onClick()
                   }}

                    >
        {label}
    </Button>
}

export default AddButton;