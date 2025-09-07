import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function DriverRoute({ children }) {
    const { isLoggedIn, isDriver, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>;
    }

    // Only allow authenticated drivers to access the route
    return (isLoggedIn && isDriver()) ? children : <Navigate to="/login" />;
}

export default DriverRoute;
