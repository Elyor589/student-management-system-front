import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Dashboard.jsx'
import {AuthContext} from "../context/auth.jsx";
import './Login.css'
import {toast} from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [touchedFields, setTouchedFields] = useState({})
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const  {username, password} = formData;

    const onChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors("");
        setTouchedFields(prev => ({...prev, [name]: true }));
    }

    const { login } = useContext(AuthContext);

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setErrors("");

        const newErrors = {};
        if (!username.trim()) newErrors.username = true;
        if (!password.trim()) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setTouchedFields(newErrors);
            setLoading(false);
            return;
        }

        const result = await login(username, password);
        if (result?.success) {
            toast.success("Login successful");
            setTimeout(() => navigate("/dashboard"), 1500);
        } else {
            toast.error(result?.message || "Incorrect username or password");
            setErrors("");
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div className="username">
                    <label>Username*</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        className={touchedFields.username && !formData.username.trim() ? "input-error" : ""}
                    />
                </div>
                <div className="password">
                    <label>Password*</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        className={touchedFields.password && !formData.password.trim() ? "input-error" : ""}
                    />
                </div>
                <button type="submit">Login</button>
                <a href="/forgot-password" className="forgot-password-link">
                    Forgot Password
                </a>
                <a href="/signup" className="register-link">Register</a>
            </form>
        </div>
    )
}

export default Login;