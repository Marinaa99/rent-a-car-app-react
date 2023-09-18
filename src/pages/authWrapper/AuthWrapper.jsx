import React from 'react';
import { Navigate } from "react-router-dom";
import { useUserData } from "../../hooksState/UserContext.jsx";

const AuthWrapper = ({ children }) => {

    const {userData} = useUserData();

    if (!userData?.id) {
        return <Navigate to="/login" replace={true} />;
    }
    return children;
};



export default AuthWrapper;
