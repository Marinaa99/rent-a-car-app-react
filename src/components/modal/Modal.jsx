import React from "react";
import {Modal as AntdModal} from 'antd';

const Modal = ({
                   open,
                   title = "",
                   content = <></>,
                   close
               }) => {
    return <AntdModal
        title={title}
        open={open}
        footer={null}
        onCancel={close}>
        {content}
    </AntdModal>
}

export default Modal;