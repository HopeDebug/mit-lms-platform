import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">🎓 LMS Dashboard</h1>
      <div className="space-x-6">
        <Link to="/">Dashboard</Link>
        {/* You can add Profile, Logout, etc. here later */}
      </div>
    </nav>
  );
};

export default Navbar;
