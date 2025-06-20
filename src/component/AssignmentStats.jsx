import {useEffect, useState} from "react";
import axios from "axios";


const AssignmentStats = () => {
    const [courseId, setCourseId] = useState([]);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    const fetchStats = () => {
        if (!courseId.trim()) {
            setError("Please fill out the course");
            setStats(null);
            return;
        }

        axios.get('http://localhost:8088/v1/tutors/getAssignmentStatsByCourseId', {
            params: { courseId }
        })
            .then(res => {
                if (Array.isArray(res.data)) {
                    setStats(res.data);
                } else if (typeof res.data === "string") {
                    const fixed = res.data.split("][")[0] + "]";
                    setStats(JSON.parse(fixed));
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="assignment-stats-container">
            <h2>View Assignment Stats by Course ID</h2>
            <input
                type="text"
                placeholder="Enter Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                style={{ padding: "8px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={fetchStats}>Get Stats</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {stats && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Stats:</h3>
                    <ul>
                        <li>Total Assignments: {stats.totalAssignments}</li>
                        <li>Total Enrollments: {stats.totalEnrollments}</li>
                        <li>Total Submissions: {stats.totalSubmissions}</li>
                        <li>Total No Submissions: {stats.totalNoSubmissions}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AssignmentStats;