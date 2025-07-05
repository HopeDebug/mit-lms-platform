import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import AppContext from "./context/AppContext"; // For useContext inside components
import EducatorLogin from "./components/educator/EducatorLogin";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Footer from "./components/common/Footer";

import AddCourse from "./components/educator/AddCourse";
import MyCourses from "./components/educator/MyCourses";
import CourseDashboard from "./components/educator/CourseDashboard";
import AttendanceTracker from "./components/educator/AttendanceTracker";
import StudentsEnrolled from "./components/educator/StudentsEnrolled";

function App() {
  return (
    <AppProvider>
      <Router>
        <div
          className="app-container"
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar />
            <main style={{ flex: 1, padding: "20px" }}>
              <Routes>
                {/* Show login page first */}
                <Route path="/" element={<EducatorLogin />} />
                <Route path="/login" element={<EducatorLogin />} />

                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/course-dashboard" element={<CourseDashboard />} />
                <Route path="/attendance" element={<AttendanceTracker />} />
                <Route
                  path="/attendance-tracker"
                  element={<AttendanceTracker />}
                />
                {/* Updated route path here */}
                <Route
                  path="/enrolled-students"
                  element={<StudentsEnrolled />}
                />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
