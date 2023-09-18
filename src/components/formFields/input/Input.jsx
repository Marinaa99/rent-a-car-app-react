import React from 'react';
import {Controller} from 'react-hook-form';
import {Input as AntdInput} from "antd";

const Input = ({
                   label = "",
                   placeholder = "",
                   name,
                   type,
                   readOnly,
                   disabled,
                   control,
                   value,
                   error
               }) => {

    const renderInput = (field) => {
        if (type === 'password') {
            return (
                <AntdInput.Password
                    disabled={disabled || readOnly}
                    placeholder={placeholder}
                    visibilityToggle={true}
                    {...field}
                />
            );
        } else {
            return (
                <AntdInput
                    type={type}
                    disabled={disabled || readOnly}
                    placeholder={placeholder}
                    value={value}
                    {...field}
                />
            );
        }
    };

    return (
        <div>
            {label && label?.length > 0 && <label>{label}</label>}
            {control &&
                <Controller
                    name={name}
                    control={control}
                    render={({field}) => renderInput(field)}
                />
            }
            {error && error?.length > 0 && <span>{error}</span>}
        </div>
    );
};

export default Input;
