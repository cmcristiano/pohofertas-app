import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants";

export default function Navbar() {
  return (
    <nav className="bg-[#0A192F] p-4 text-white flex gap-4 flex-wrap justify-center">
      {CATEGORIES.map(cat => (
        <Link
          key={cat.id}
          to={`/${cat.id}`}
          className="flex items-center gap-1 hover:text-[#FF6600] font-semibold"
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </Link>
      ))}
    </nav>
  );
}