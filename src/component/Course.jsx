import React, {useEffect, useState} from "react";
import {fetchCourses} from "../api/CourseApi.jsx";

const CoursePage = ({ courses }) => {
    return (
        <div>
            <h2>All Courses</h2>
            {Array.isArray(courses) && courses.length > 0 ? (
                <ul>
                    {courses.map(course => (
                        <li key={course.courseId}>
                            <strong>{course.courseTitle}</strong>
                            <ul>
                                {course.tutorCourses.map(tutor => (
                                    <li key={tutor.tutorCourseId}>
                                        Taught by {tutor.tutorName} (Semester {tutor.semester}, Year {tutor.year})
                                    </li>
                                ))}
                            </ul>
                            <p>Enrollments: {course.enrollments.length}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
}

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses()
            .then(res =>  {
                console.log("Fetching Courses: ", res.data);
                setCourses(res.data);
            })
            .catch(err => {
                console.error(err);
                setCourses([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="courses-page">
            <h2>All Courses</h2>
            <CoursePage courses={courses} />
        </div>
    )
}

export default Course;