// AuthContext.js - React context for authentication state management

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on initial load
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserType = localStorage.getItem('userType');
        const storedUserId = localStorage.getItem('userId');
        const storedUserName = localStorage.getItem('userName') || localStorage.getItem('adminUsername');
        const storedToken = localStorage.getItem('token');

        if (storedLoggedIn === 'true' && storedToken) {
            setIsLoggedIn(true);
            setUserType(storedUserType);
            setUserId(storedUserId);
            setUserName(storedUserName);
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    // Login function
    const login = (userData) => {
        const { token, userType, userId, name, username } = userData;
        
        // Store auth data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType);
        localStorage.setItem('userId', userId);
        
        if (userType === 'admin') {
            localStorage.setItem('adminUsername', username);
        } else {
            localStorage.setItem('userName', name);
        }
        
        // Update context state
        setIsLoggedIn(true);
        setUserType(userType);
        setUserId(userId);
        setUserName(userType === 'admin' ? username : name);
        setToken(token);
        
        return true;
    };

    // Logout function
    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('adminUsername');
        
        // Update context state
        setIsLoggedIn(false);
        setUserType(null);
        setUserId(null);
        setUserName(null);
        setToken(null);
    };

    // Check if user has admin role
    const isAdmin = () => userType === 'admin';
    
    // Check if user has driver role
    const isDriver = () => userType === 'driver';

    const authContextValue = {
        isLoggedIn,
        userType,
        userId,
        userName,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isDriver
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
