import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ title: '', description: '', youtubeLinks: [''] });
  const [materials, setMaterials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleYouTubeChange = (idx, value) => {
    const links = [...form.youtubeLinks];
    links[idx] = value;
    setForm({ ...form, youtubeLinks: links });
  };

  const addYouTubeLink = () => {
    setForm({ ...form, youtubeLinks: [...form.youtubeLinks, ''] });
  };

  const handleFileChange = (e) => {
    setMaterials(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('description', form.description);
      form.youtubeLinks.forEach(link => data.append('youtubeLinks', link));
      if (materials) Array.from(materials).forEach(f => data.append('materials', f));
      await axios.post('/api/courses', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Create/Edit Course</h2>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <div>
        <label className="block font-semibold">YouTube Links</label>
        {form.youtubeLinks.map((link, idx) => (
          <input
            key={idx}
            type="text"
            value={link}
            onChange={e => handleYouTubeChange(idx, e.target.value)}
            placeholder="YouTube Video URL"
            className="w-full border p-2 rounded mb-2"
          />
        ))}
        <button type="button" onClick={addYouTubeLink} className="text-blue-600">+ Add Link</button>
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Course'}
      </button>
    </form>
  );
};

export default CourseForm; 