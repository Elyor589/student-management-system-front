import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors("")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8088/v1/students/create-student", formData)
            navigate("/login");
        } catch (err) {
            if (err.response?.data?.message === "Email already exists") {
                setErrors("Email already exists");
            } else {
                setErrors(errors);
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign up</h2>
            <p>Start your 30-day free trial.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={errors ? "error" : ""}
                    />
                    {errors && <div className="error-message">{errors}</div>}
                </div>

                <div>
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

                <button type="submit" className="submit">
                    Get started
                </button>
            </form>

            <button className="google-signup">
                <FcGoogle size={20} />
                Sign up with Google
            </button>

            <p className="login-link">
                Already have an account? <a href="/login">Log in</a>
            </p>
        </div>
    );
};

export default SignUp;