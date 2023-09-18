import React from 'react';
import { Navigate } from "react-router-dom";
import { useUserData } from "../../hooksState/UserContext.jsx";

const AuthWrapper = ({ children, allowedRoles, redirectOnRole }) => {
    const { userData } = useUserData();

    if (!userData?.id) {
        return <Navigate to="/login" replace={true} />;
    }

    if (redirectOnRole && redirectOnRole[userData.role_id]) {
        return <Navigate to={redirectOnRole[userData.role_id]} replace={true} />;
    }

    if (allowedRoles && !allowedRoles.includes(userData.role_id)) {
        return <Navigate to="/error" replace={true} />;
    }

    return children;
};

export default AuthWrapper;
