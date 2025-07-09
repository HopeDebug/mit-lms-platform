import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Educator Panel</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/my-courses">📚 My Courses</NavLink>
        <NavLink to="/add-course">➕ Add Course</NavLink>
        <NavLink to="/enrolled-students">👨‍🎓 Enrolled Students</NavLink>
        <NavLink to="/attendance">📝 Attendance</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
