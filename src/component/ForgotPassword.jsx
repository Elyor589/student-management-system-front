import React, {useState} from "react";
import axios from "axios";
import StudentForm from "./StudentForm.jsx";
import './ForgotPassword.css'
import {FaCheckCircle} from 'react-icons/fa'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function ForgotPassword() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState("send");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus("")
        setError("");
        setLoading(true);

        try {
            await axios.post("http://localhost:8088/v1/auth/forgot-password", null, {
                params: {
                    phoneNumber: phone
                }
            });

            toast.success("Verification code sent")
            setStatus("Verification code sent");
            setStep("reset");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

        setTimeout(() => {
            setStatus("");
        }, 3000)
    };

    const resetPassword = async (e)=> {
        e.preventDefault();
        setLoading(true);
        setStatus("")
        setError("");

        try {
            await axios.put("http://localhost:8088/v1/auth/change-password", null, {
                params: {
                    code: code,
                    newPassword: newPassword
                }
            });

            setStatus("Password reset successful");

            setTimeout(() => {
                navigate("/login");
            }, 3000)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {step === "send" && (
                <form className="reset-phone" onSubmit={onSubmit} autoComplete="off">
                    <label>Phone number*</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            "Send"
                        )}
                    </button>
                </form>
            )}

            {step === "reset" && (
                <form onSubmit={resetPassword} autoComplete="off">
                    <input
                        type="text"
                        placeholder="Verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>
            )}

            {error && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "10px", fontWeight: "700" }}>
                    {error}
                </p>
            )}
        </div>
    )
}

export default ForgotPassword;