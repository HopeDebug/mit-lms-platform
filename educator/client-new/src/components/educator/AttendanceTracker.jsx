// src/AttendanceTracker.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttendanceTracker = () => {
  const { courseId } = useParams(); // ✅ now gets from URL
  const sessionDate = new Date().toISOString().slice(0, 10); // default today's date

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`/api/attendance/${courseId}/students`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setStudents(res.data);
        setAttendance(res.data.reduce((acc, s) => ({ ...acc, [s._id]: false }), {}));
      })
      .catch(err => setError(err.response?.data?.message || 'Error loading students'))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleChange = (studentId, present) => {
    setAttendance({ ...attendance, [studentId]: present });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post(`/api/attendance/${courseId}`, {
        sessionDate,
        records: students.map(s => ({ student: s._id, present: attendance[s._id] }))
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Attendance saved!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving attendance');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Mark Attendance</h2>
      {success && <div className="text-green-600">{success}</div>}
      <ul>
        {students.map(student => (
          <li key={student._id} className="flex items-center mb-2">
            <span className="flex-1">{student.name}</span>
            <label className="mr-2">
              <input
                type="checkbox"
                checked={attendance[student._id] || false}
                onChange={e => handleChange(student._id, e.target.checked)}
              /> Present
            </label>
          </li>
        ))}
      </ul>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Attendance</button>
    </form>
  );
};

export default AttendanceTracker;
