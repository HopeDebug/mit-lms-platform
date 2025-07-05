import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentsEnrolled = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/enrollments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEnrollments(response.data);
      } catch (error) {
        console.error("Failed to fetch enrolled students", error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h2>Enrolled Students</h2>
      {enrollments.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        enrollments.map((enroll, index) => (
          <p key={index}>
            ({enroll.student?.name}) - Course: {enroll.course?.title}
          </p>
        ))
      )}
    </div>
  );
};

export default StudentsEnrolled;
