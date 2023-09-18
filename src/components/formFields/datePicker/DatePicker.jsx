import React from "react";

import { DatePicker as AntdDatePicker, Space } from "antd";

const { RangePicker } = AntdDatePicker;
const DatePicker = ({ onChange, defaultValue, className }) => {
    return (
        <Space>
            <RangePicker
                className={className}
                format="YYYY-MM-DD"
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </Space>
    );
};

export default DatePicker;