import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Redirect = () => {
    const loggedIn = localStorage.getItem("loggedIn");
    return loggedIn ? <Outlet /> : <Navigate to={"/prijava"} />;
}

export default Redirect;