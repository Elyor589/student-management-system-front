import React, {useEffect} from "react";
import axios from "axios";
import './StudentList.css'

const StudentList = () => {
    const [students, setStudents] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:8088/v1/students/getAllStudents')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setStudents(res.data);
                } else if (typeof res.data === "string") {
                    const fixed = res.data.split("][")[0] + "]";
                    setStudents(JSON.parse(fixed));
                }
            })
            .catch(err => console.error("Error getting students: ", err));
    }, []);

    return (
        <div className="student-list-container">
            <h2>All Students</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Enrollments</th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.studentId}>
                        <td>{student.studentId}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.dateOfBirth}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{student.enrollments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default StudentList;