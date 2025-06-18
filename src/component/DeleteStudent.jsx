import {useState} from "react";


const DeleteStudent = () => {
    const [studentId, setStudentId] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleDelete = async () => {
        if (!studentId){
            setMessage("Please enter student Id");
            setIsError(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8088/students/delete-student/${studentId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setMessage("Student Not Found");
                } else {
                    const text = await response.text();
                    let errorMessage;
                    try {
                        const errorData = JSON.parse(text);
                        errorMessage = errorData.error || JSON.stringify(errorData);
                    } catch {
                        errorMessage = text;
                    }

                    setMessage(errorMessage);
                }
                setIsError(true);
                setTimeout(() => setMessage(""), 3000);
                return;
            }

            setMessage("Deleted");
            setIsError(false);
            setStudentId("");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error: " + error.message);
            setIsError(true);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="delete-student-container">
            <h2>Delete Student</h2>
            {message && (
                <div className={`delete-student-message ${isError ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
            <input
                type="text"
                placeholder="Enter Student Id"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />
            <button onClick={handleDelete}>Delete student</button>
        </div>
    )
}

export default DeleteStudent;