import React, {useEffect, useState} from "react";

const EditStudent = () => {
    const [formDate, setFormDate] = useState({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        age: "",
        dateOfBirth: "",
        gender: ""
    })

    const studentId = formDate.studentId;
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!studentId) return;

        const timer = setTimeout(() => {
            const fetchStudent = async () => {
                try {
                    const response = await fetch(`http://localhost:8094/students/getStudent/${studentId}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });

                    const text = await response.text();

                    if (!text) {
                        setMessage("");
                        setIsError(true);
                        return;
                    }

                    const data = JSON.parse(text);
                    setFormDate({
                        studentId,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        age: data.age,
                        dateOfBirth: data.dateOfBirth,
                        gender: data.gender,
                    });

                    setMessage("");
                    setIsError(false);
                } catch (error) {
                    setMessage(error.message);
                    setIsError(true);
                }
            };

            fetchStudent();
        }, 1000);

        return () => clearTimeout(timer);
    }, [studentId]);

    const handleChange = (e) => {
        setFormDate({...formDate, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8094/students/update-student/${studentId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formDate),
            });

            if (!response.ok){
                const text = await response.text();
                let errorMessage;
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.error || JSON.stringify(errorData);
                } catch {
                    errorMessage = text;
                }

                setMessage(errorMessage);
                setTimeout(() => setMessage(""), 3000);
                setIsError(true);
                return;
            }

            setMessage('Student updated!');
            setIsError(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage("Error: "+error.message);
            setIsError(true);
        }
    };

    return (
        <div className="edit-student-container">
            <h2>Edit Student</h2>
            {message && (
            <div style={{color: isError ? 'red' : 'green', marginBottom: '15px', fontWeight: '600'}}>
                {message}
            </div>)}

            <form onSubmit={handleSubmit}>
                <input
                    name="studentId"
                    type="text"
                    value={formDate.studentId}
                    onChange={handleChange}
                    placeholder="Student Id"
                    required
                />
                <input
                    name="firstName"
                    type="text"
                    value={formDate.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    value={formDate.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={formDate.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="phoneNumber"
                    type="tel"
                    value={formDate.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    name="age"
                    type="number"
                    value={formDate.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />
                <input
                    name="dateOfBirth"
                    type="text"
                    value={formDate.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    required
                />
                <select
                    name="gender"
                    value={formDate.gender}
                    onChange={handleChange}
                    required
                    style={{ color: formDate.gender ? 'black' : 'rgba(153,153,153,0.79)' }}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>


                <button type="submit">Update Student</button>
            </form>

        </div>
    )
}

export default EditStudent;