import axios from "axios";

export const fetchCourses = () => axios.get("http://localhost:8088/v1/course/getAllCourses")