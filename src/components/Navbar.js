import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants";

export default function Navbar() {
  return (
    <nav className="bg-[#0A192F] p-4 text-white flex gap-6 justify-center">
      {CATEGORIES.map(cat => (
        <div key={cat.id} className="relative group">
          {/* Categoria principal */}
          <Link
            to={`/${cat.id}`}
            className="flex items-center gap-1 font-semibold hover:text-[#FF6600]"
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>

          {/* Dropdown */}
          {cat.subcategories && (
            <div
              className="
                absolute left-0 top-full mt-2
                hidden group-hover:block
                bg-white text-black
                min-w-[220px]
                rounded shadow-lg
                z-50
              "
            >
              {cat.subcategories.map(sub => (
                <Link
                  key={sub}
                  to={`/${cat.id}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-[#FF6600]"
                >
                  {sub}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
