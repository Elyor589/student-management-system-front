import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const Tutor = () => {
    const [tutor, setTutor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        axios.get('http://localhost:8088/v1/tutors/getAllTutors')
        .then(res => {
            if (Array.isArray(res.data)) {
                setTutor(res.data);
            } else if (typeof res.data === "string") {
                const fixed = res.data.split("][")[0] + "]";
                setTutor(JSON.parse(fixed));
            }
        })
        .catch(err => console.log("Error getting Tutor", err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="tutor-list-container">
            <h2>All Students</h2>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Date of Birth</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Department</th>
                </tr>
                </thead>
                <tbody>
                {tutor.map(tutors => (
                    <tr key={tutors.id}>
                        <td>{tutors.firstName}</td>
                        <td>{tutors.lastName}</td>
                        <td>{tutors.username}</td>
                        <td>{tutors.password}</td>
                        <td>{tutors.dateOfBirth}</td>
                        <td>{tutors.email}</td>
                        <td>{tutors.phoneNumber}</td>
                        <td>{tutors.department}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tutor;