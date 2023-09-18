import React from 'react';
import {Spin} from 'antd';

const Loader = ({message = "Loading..."}) => {
    return <Spin size="large"/>;
};

export default Loader;
