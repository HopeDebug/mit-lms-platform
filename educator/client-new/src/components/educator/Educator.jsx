import React, { useEffect, useState } from 'react';

const API_URL = '/api/educator/courses'; // Adjust this endpoint as needed

const Educator = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to create course');
      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
      setShowForm(false);
      setForm({ title: '', description: '' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Educator Courses</h2>
      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {courses.length === 0 ? (
            <li>No courses found.</li>
          ) : (
            courses.map((course) => (
              <li key={course._id || course.id} style={{ marginBottom: 16 }}>
                <strong>{course.title}</strong>
                <div>{course.description}</div>
              </li>
            ))
          )}
        </ul>
      )}
      <button onClick={() => setShowForm((f) => !f)} style={{ marginTop: 24 }}>
        {showForm ? 'Cancel' : 'Create New Course'}
      </button>
      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: 16 }}>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                required
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          <div style={{ marginTop: 8 }}>
            <label>
              Description:
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                required
                style={{ marginLeft: 8, verticalAlign: 'top' }}
              />
            </label>
          </div>
          <button type="submit" disabled={submitting} style={{ marginTop: 12 }}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          {submitError && <p style={{ color: 'red' }}>Error: {submitError}</p>}
        </form>
      )}
    </div>
  );
};

export default Educator;
