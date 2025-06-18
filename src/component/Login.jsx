import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Dashboard.jsx'
import {AuthContext} from "../context/auth.jsx";
import './Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const  {username, password} = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors("");
    }

    const { login } = useContext(AuthContext);

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setErrors("");

        const result = await login(username, password);
        if (result.success) {
            navigate("/dashboard");
        } else {
            setErrors("Incorrect username or password");
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <a href="/forgot-password" className="forgot-password-link">
                    Forgot Password
                </a>
            </form>
        </div>
    )
}

export default Login;