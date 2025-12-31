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
      {/* B) HEADER (Sticky) */}
<header className="sticky top-0 z-40 bg-white shadow-md">
  <div className="container mx-auto px-4 pt-3 pb-2">
    {/* Linha superior */}
    <div className="flex justify-between items-center mb-2">
      {/* LOGO + SLOGAN */}
      <div className="flex flex-col items-start">
        <svg
          viewBox="0 0 220 50"
          className="w-[180px] h-[44px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="PohOfertas Logo"
        >
          <g transform="translate(0,5)">
            <path
              d="M5 20C5 14.5 9.5 10 15 10H30L50 30L30 50H15C9.5 50 5 45.5 5 40V20Z"
              fill="#FF6600"
              transform="rotate(-15 25 30)"
            />
            <circle
              cx="18"
              cy="14"
              r="3"
              fill="#fff"
              transform="rotate(-15 25 30)"
            />
            <path
              d="M18 28L24 34L36 18"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(-5 25 30)"
            />
          </g>

          <text
            x="60"
            y="36"
            fontFamily="'Segoe UI', Roboto, sans-serif"
            fontWeight="800"
            fontSize="32"
            fill="#0A192F"
            letterSpacing="-0.5"
          >
            PohOfertas
          </text>
        </svg>

        <span className="text-[10px] font-bold tracking-widest text-gray-500 ml-1">
          SELEÇÃO OFICIAL DAS MELHORES OPORTUNIDADES
        </span>
      </div>

      {/* BOTÃO PEDIR */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noreferrer"
        className="bg-green-600 text-white px-3 py-2 rounded-full font-bold text-xs flex items-center gap-1 shadow hover:scale-105 transition"
      >
        PEDIR
      </a>
    </div>

    {/* BUSCA */}
    <div className="relative w-full">
      <input
        type="text"
        placeholder="O que você procura hoje?"
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
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
