import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
    const token = Cookies.get('api_token');

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;