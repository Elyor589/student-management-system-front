import React, {useEffect, useState} from "react";
import axios from "axios";

const Course = () => {
    const [course, setCourse] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8088/v1/course/getAllCourses")
            .then(res => {
                if (Array.isArray(res.data)) {
                    setCourse(res.data);
                } else if (typeof res.data === "string") {
                    const fixed = res.data.split("][")[0] + "]";
                    setCourse(JSON.parse(fixed));
                }
            })
            .catch(err => console.log("Error fetching Course", err))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>All Courses</h2>
            <table>
                <thead>
                <tr>
                    <th>Course Id</th>
                    <th>Course Title</th>
                    <th>Tutor</th>
                    <th>Enrollment Count</th>
                </tr>
                </thead>
                <tbody>
                {course.map(c => (
                    <tr key={c.courseId}>
                        <td>{c.courseId}</td>
                        <td>{c.courseTitle}</td>
                        <td>
                            {c.tutorCourses.map(tutor => (
                                <div key={tutor.tutorCourseId}>
                                    {tutor.tutorName}
                                </div>
                            ))}
                        </td>
                        <td>{c.enrollments.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

};

export default Course;