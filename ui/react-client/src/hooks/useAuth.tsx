import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : {children:ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage && localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
    },[]);

    const login = () => {

    }

    const logout = () => {
        localStorage.clear();
        window.location.replace("/");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ():AuthContextType|undefined => {
 const context = useContext(AuthContext);
if (!context) {
    throw new Error('useAuth must be within AuthProvider');
}

 return context;
}

export default useAuth;