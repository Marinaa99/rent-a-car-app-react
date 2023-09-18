import React from "react";
import {Controller} from "react-hook-form";
import {Input} from "antd";

const Textarea = ({
                      label = "",
                      placeholder = "",
                      name,
                      control,
                      disabled,
                      error
                  }) => {
    return <div>
        {label && label?.length > 0 && <label>{label}</label>}
        {control &&
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <Input
                        type="textarea"
                        placeholder={placeholder}
                        disabled={disabled}
                        rows="4" cols="50"
                        {...field}
                    />
                )}
            />
        }
        {error && error?.length > 0 && <span>{error}</span>}
    </div>
}

export default Textarea;