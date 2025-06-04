import React, {useState} from 'react';
import './StudentForm.css'

export default function StudentForm() {
    const [formDate, setFormDate] = useState({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        phoneNumber: '',
    });

    const [errors, setError] = useState({});
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formDate.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formDate.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formDate.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formDate.email)) newErrors.email = "Email is invalid";
        if (!formDate.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of Birth is required";
        if (!formDate.age.trim()) newErrors.age = "Age is required";
        if (!formDate.gender.trim()) newErrors.gender = "Gender is required";
        if (!formDate.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);

            setTimeout(() => {
                setError({});
            }, 5000)

            return false
        }

        return true;

    };

    const handleChange = (e) => {
        setFormDate(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch("http://localhost:8094/students/create-student", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formDate)
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage;
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.error || JSON.stringify(errorData);
                } catch {
                    errorMessage = text;
                }
                setMessage(errorMessage);
                setIsError(true);
                return;
            }

            setMessage("Succuess");
            setIsError(false);
            setTimeout(() => setMessage(''), 3000);

        } catch (error) {
            console.error("Network error:", error);
            setMessage("Network error: " + error.message);
        }
    };

    return (
        <div className="student-form-container">
            <h2>Create Student</h2>
            {message && (
                <div style={{
                    color: isError ? "red" : '#3bcd31',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontWeight: '600'
                }}>
                    {message}
                </div>
            )}
            <form className="student-form" onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formDate.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                </div>

                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formDate.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formDate.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        name="dateOfBirth"
                        value={formDate.dateOfBirth}
                        onChange={handleChange}
                    />
                    {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
                </div>

                <div>
                    <label>Age</label>
                    <input
                        type="text"
                        name="age"
                        value={formDate.age}
                        onChange={handleChange}
                    />
                    {errors.age && <p className="error-text">{errors.age}</p>}
                </div>

                <div>
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formDate.gender}
                        onChange={handleChange}
                        required
                        style={{ color: formDate.gender ? 'black' : 'rgba(153,153,153,0.79)' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>


                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formDate.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                </div>

                <button type="submit">Create student</button>
            </form>
        </div>
    );
}