import {BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate} from 'react-router-dom';
import StudentForm from "./component/StudentForm.jsx";
import StudentList from "./component/StudentList.jsx";
import Home from "./component/Home.jsx";
import EditStudent from "./component/EditStudent.jsx";

import './App.css';
import './component/StudentList.css';
import './component/EditStudent.css';
import './component/DeleteStudent.css'
import NavLinkWithFade from "./component/NavLinkWithFade.jsx";
import DeleteStudent from "./component/DeleteStudent.jsx";
import Login from "./component/Login.jsx";
import {AuthProvider, AuthContext} from "./context/auth.jsx";
import axios from "axios";
import React, {useContext, useState} from 'react';
import Dashboard from "./component/Dashboard.jsx";
import ErrorBoundary from "./component/ErrorBoundry.jsx";
import ForgotPassword from "./component/ForgotPassword.jsx";
import SignUp from "./component/SignUp.jsx";
import {ToastContainer} from "react-toastify";
import Course from "./component/Course.jsx";

const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    return authState.isAuthenticated ? children : <Navigate to="/login" replace/>;
};

function AppRoutes() {
    const location = useLocation();

    return (
        <div className="page-fade">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/create" element={
                    <PrivateRoute>
                        <StudentForm />
                    </PrivateRoute>
                } />
                <Route path="/list" element={
                    <PrivateRoute>
                        <StudentList />
                    </PrivateRoute>
                } />
                <Route path="/edit" element={
                    <PrivateRoute>
                        <EditStudent />
                    </PrivateRoute>
                } />
                <Route path="/delete" element={
                    <PrivateRoute>
                        <DeleteStudent />
                    </PrivateRoute>
                } />

                <Route path="/courses" element={
                    <PrivateRoute>
                        <Course />
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    );
}


function AppContent() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { authState, logout } = useContext(AuthContext)

    return (
        <Router>
            <div className="app-container">
                <header>
                    <nav>
                        <ToastContainer position="top-center" autoClose={2000} />
                        <NavLinkWithFade to="/" className="nav-button">Home</NavLinkWithFade>

                        {authState?.isAuthenticated ? (
                            <div className="dropdown">
                                <button className="dropdown-toggle" onClick={() => setShowDropdown(prev => !prev)}>
                                    Students
                                </button>
                                {showDropdown && (
                                    <div className="dropdown-menu">
                                        <NavLinkWithFade to="/dashboard" className="dropdown-item">Dashboard</NavLinkWithFade>
                                        <NavLinkWithFade to="/create" className="dropdown-item">Create</NavLinkWithFade>
                                        <NavLinkWithFade to="/list" className="dropdown-item">View All</NavLinkWithFade>
                                        <NavLinkWithFade to="/edit" className="dropdown-item">Edit</NavLinkWithFade>
                                        <NavLinkWithFade to="/delete" className="dropdown-item">Delete</NavLinkWithFade>
                                        <button onClick={logout}>Logout</button>
                                    </div>
                                )}

                                <NavLinkWithFade to="/courses" className="dropdown-item">Courses</NavLinkWithFade>
                            </div>
                        ) : (
                            <>
                                <NavLinkWithFade to="/login" className="nav-button">Login</NavLinkWithFade>
                                <NavLinkWithFade to="/signUp" className="nav-button">SignUp</NavLinkWithFade>
                            </>
                        )}
                    </nav>
                </header>

                <div className="main-content">
                    <main>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </Router>
    );
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(respone => respone, error => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return Promise.reject(error);
})

function App() {
    return (
        <AuthProvider>
            <ErrorBoundary>
                <AppContent />
            </ErrorBoundary>
        </AuthProvider>
    )
}

export default App;
