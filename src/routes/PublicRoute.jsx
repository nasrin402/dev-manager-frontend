import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../components/authContext/AuthContext';

const PublicRoute = ({children}) => {
    const {user} = useContext(authContext)
    const location = useLocation
    const loadedComp = user ? <Navigate to={location?.state?.from ? location?.state?.from : "/contacts"} /> : children
    return (
        <div>
           {loadedComp}
        </div>
    );
}

export default PublicRoute;
