import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants";

export default function Navbar() {
  return (
    <nav className="bg-[#0A192F] p-4 text-white flex gap-6 flex-wrap justify-center">
      {CATEGORIES.map(cat => (
        <div key={cat.id} className="relative group">
          {/* Categoria principal */}
          <Link
            to={`/${cat.id}`}
            className="flex items-center gap-1 hover:text-[#FF6600] font-semibold"
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>

          {/* Subcategorias (dropdown) */}
          {cat.subcategories && (
            <div className="absolute hidden group-hover:block bg-white text-black mt-2 p-2 rounded shadow-lg">
              {cat.subcategories.map(sub => (
                <Link
                  key={sub}
                  to={`/${cat.id}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-2 py-1 hover:text-[#FF6600]"
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