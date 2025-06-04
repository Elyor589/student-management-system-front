import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import StudentForm from "./component/StudentForm.jsx";
import StudentList from "./component/StudentList.jsx";
import Home from "./component/Home.jsx";
import EditStudent from "./component/EditStudent.jsx";

import './App.css';
import './component/StudentList.css';
import './component/EditStudent.css';
import './component/DeleteStudent.css'
import NavLinkWithFade from "./component/NavLinkWithFade.jsx";
import DeleteStudent from "./component/DeleteStudent.jsx";

function AppRoutes() {
    const location = useLocation();

    return (
        <div className="page-fade">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<StudentForm />} />
                <Route path="/list" element={<StudentList />} />
                <Route path="/edit" element={<EditStudent />} />
                <Route path="/delete" element={<DeleteStudent />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <nav>
                        <NavLinkWithFade to="/" className="nav-button">Home</NavLinkWithFade>
                        <NavLinkWithFade to="/create" className="nav-button">Create</NavLinkWithFade>
                        <NavLinkWithFade to="/list" className="nav-button">View All</NavLinkWithFade>
                        <NavLinkWithFade to="/edit" className="nav-button">Edit</NavLinkWithFade>
                        <NavLinkWithFade to="/delete" className="nav-button">Delete</NavLinkWithFade>
                    </nav>
                </header>

                <div className="main-content">
                    <main>
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
