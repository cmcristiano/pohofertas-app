import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0A192F] p-4 text-white flex gap-6">
      <Link to="/" className="hover:text-[#FF6600]">Home</Link>
      <Link to="/admin" className="hover:text-[#FF6600]">Admin</Link>
      <Link to="/dashboard" className="hover:text-[#FF6600]">Dashboard</Link>
    </nav>
  );
}