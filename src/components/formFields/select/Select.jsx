import React from "react";
import {Controller} from 'react-hook-form';
import {Select as AntdSelect} from "antd";

const {Option} = AntdSelect;

const Select = ({
                    label = "",
                    name,
                    control,
                    placeholder,
                    error,
                    disabled,
                    options
                }) => {
    return (
        <div>
            {label && label.length > 0 && <label>{label}</label>}
            {control && (
                <Controller
                    name={name}
                    control={control}
                    render={({field}) => (
                        <AntdSelect
                            placeholder={placeholder}
                            style={{
                                minWidth: "100%",
                                marginBottom: "20px"
                            }}
                            {...field}
                            onChange={(value) => {
                                field.onChange(value);
                            }}
                            disabled={disabled}
                        >
                            {options.map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </AntdSelect>
                    )}
                />
            )}
            {error && error.length > 0 && <span>{error}</span>}
        </div>
    );
};

export default Select;
