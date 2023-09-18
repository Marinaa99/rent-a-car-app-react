import React from "react";
import {Button as AntdButton} from "antd";


const Button = ({label, onClick, className = ""}) => {
    return <AntdButton type="button"
                       className={className}
                       onClick={(e) => {
                           e.preventDefault();
                           if (onClick) {
                               onClick(e);
                           }
                       }}>
        {label}
    </AntdButton>
}

export default Button;