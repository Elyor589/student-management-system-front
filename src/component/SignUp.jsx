import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [checkingUsername, setCheckingUsername] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        if (errors[name]) {
            setErrors({ ...errors, [name]: ""});
        }

        if (name === "email") {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setEmailValid(isValid);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8088/v1/auth/register", formData)
            navigate("/login");
        } catch (err) {
            if (err.response?.data?.message === "Email already exists") {
                setErrors("Email already exists");
            } else {
                setErrors(errors);
            }
        }
    };

    useEffect(() => {
        const checkUsername = async () => {
            if (formData.username.trim().length < 3) {
                setUsernameAvailable(null);
                return;
            }

            setCheckingUsername(true);
            try {
                const res = await axios.get(`http://localhost:8088/v1/auth/checkUsername?username=${formData.username}`);
                setUsernameAvailable(res.data.available);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setUsernameAvailable(null);
            } finally {
                setCheckingUsername(false);
            }
        };

        const timeOut = setTimeout((checkUsername), 500);
        return () => clearTimeout(timeOut);
    }, [formData.username]);

    return (
        <div className="signup-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="username">
                    <label>Username*</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Create a username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className={
                        formData.username.length === 0
                            ? "input-default"
                            : usernameAvailable === true
                            ? "input-valid"
                            : usernameAvailable === false
                            ? "input-invalid" : ""
                        }
                    />
                    {formData.username && (
                        <div className="availability-message">
                            {checkingUsername ? (
                                <span style={{ color: "#999" }}>checking...</span>
                            ) : usernameAvailable === true ? (
                                <span style={{ color: "#28a745" }}>username available</span>
                            ) : usernameAvailable === false ? (
                                <span style={{ color: "#dc3545" }}>username not available</span>
                            ) : null}
                        </div>
                    )}
                </div>
                <div className="password">
                    <label>Password*</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </div>
                <div className="phoneNumber">
                    <label>Phone Number*</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        minLength={8}
                    />
                </div>
                <div className="email">
                    <label>Email*</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={
                        formData.email.length === 0
                            ? "input-default"
                            : emailValid
                            ? "input-valid"
                            : "input-invalid"
                        }
                        required
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <button type="submit" className="submit">
                    Get started
                </button>
            </form>

            <p className="login-link">
                Already have an account? <a className="link" href="/login">Log in</a>
            </p>
        </div>
    );
};

export default SignUp;