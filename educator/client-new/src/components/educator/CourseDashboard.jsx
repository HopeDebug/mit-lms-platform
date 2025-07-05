import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentStatus from './PaymentStatus';

const CourseDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/dashboard/educator', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setDashboard(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error loading dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!dashboard) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Educator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Courses</h2>
          <div className="text-3xl">{dashboard.totalCourses}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Enrollments</h2>
          <div className="text-3xl">{dashboard.totalEnrollments}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Attendance</h2>
          <div>Total Sessions: {dashboard.attendanceStats.totalSessions}</div>
          <div>Avg Attendance: {dashboard.attendanceStats.averageAttendance}%</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <PaymentStatus paymentHistory={dashboard.paymentHistory} paymentStatus={dashboard.paymentStatus} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Your Courses</h2>
        <ul>
          {dashboard.courses.map(course => (
            <li key={course._id} className="mb-2">
              <span className="font-bold">{course.title}</span> - {course.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDashboard; 