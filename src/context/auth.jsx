import React, {createContext, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem("token"),
        isAuthenticated: !!localStorage.getItem('token'),
        user: null
    });

    const login = async (username, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const res = await axios.post('http://localhost:8088/v1/auth/login', formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            localStorage.setItem("token", res.data.token);
            setAuthState({
                token: res.data.token,
                isAuthenticated: true,
                user: res.data.user,
            });
            return {success: true, data: res.data};
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthState({
            token: null,
            isAuthenticated: false,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};