import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../components/authContext/AuthContext';

const PrivateRoute = ({children}) => {
    const {user} = useContext(authContext);
    const location = useLocation();
    
    const loadedCom = user ? children : <Navigate to='/login' state={{from: location.pathname
    }} />
    return (
        <div>
            {loadedCom}
        </div>
    );
}

export default PrivateRoute;
