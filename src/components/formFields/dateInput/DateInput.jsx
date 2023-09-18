import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import moment from "moment";

const DateInput = ({
                       label = "",
                       placeholder = "",
                       name,
                       disabled,
                       control,
                       error,
                   }) => {

    return (
        <div>
            {label && label?.length > 0 && <label>{label}</label>}
            {control &&
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            showToday={false}
                            disabled={disabled}
                            placeholder={placeholder}
                            format='YYYY-MM-DD'
                            value={field.value ? moment(field.value, 'YYYY-MM-DD') : null}
                            onChange={date => {
                                const formattedDate = date ? date.format('YYYY-MM-DD') : null;
                                setValue(name, formattedDate);
                            }}
                        />
                    )}
                />
            }
            {error && error?.length > 0 && <span>{error}</span>}
        </div>
    );
};

export default DateInput;
