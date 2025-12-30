import React, { useMemo, useState } from 'react';
import { CATEGORIES, PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto p-4">
          <strong className="text-xl">PohOfertas</strong>

          <input
            className="w-full mt-3 border px-4 py-2 rounded-lg"
            placeholder="Buscar ofertas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <nav className="flex gap-2 mt-4 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma oferta cadastrada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow p-3">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-xs line-clamp-2">{p.title}</h3>
                <p className="font-black text-lg">
                  R$ {p.newPrice.toFixed(2)}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm"
                >
                  VER OFERTA
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
