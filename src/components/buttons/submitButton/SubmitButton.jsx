import React from "react";
import { Button } from "antd";



const SubmitButton = ({label, onClick = () => {}, className = ""}) => {
    return <Button htmlType="submit"
                   onClick={() => {
                       onClick()
                   }
                   }
    >
        {label}
    </Button>
}

export default SubmitButton