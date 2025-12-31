import React, { useState, useMemo } from 'react';
import { Search, Smartphone, Home, User } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from './constants';
import { Product } from './types';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return PRODUCTS.filter((product) => {
      const validityDate = new Date(product.validity);
      if (validityDate < today) return false;

      if (activeCategory !== 'all' && product.category !== activeCategory) return false;

      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOPO */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO SVG */}
          <svg
            viewBox="0 0 220 50"
            className="h-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(0,5)">
              <path
                d="M5 20C5 14 9 10 15 10H30L50 30L30 50H15C9 50 5 46 5 40V20Z"
                fill="#FF6600"
                transform="rotate(-15 25 30)"
              />
              <circle cx="18" cy="12" r="3" fill="#fff" />
              <path
                d="M18 28L24 34L36 18"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <text
              x="60"
              y="36"
              fontSize="32"
              fontWeight="800"
              fill="#0A192F"
            >
              PohOfertas
            </text>
          </svg>

          <a
            href="#"
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1"
          >
            <Smartphone size={16} />
            PEDIR
          </a>
        </div>

        {/* BUSCA */}
        <div className="px-4 pb-3 max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:bg-white border"
              placeholder="O que você procura hoje?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORIAS */}
        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </nav>
      </header>

      {/* PRODUTOS */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma oferta encontrada</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2">
                    {pro
