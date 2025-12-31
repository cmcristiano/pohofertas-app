import React, { useEffect, useMemo, useState } from 'react';
import {
  Instagram,
  Facebook,
  Send,
  Users,
  Smartphone,
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react';

import { CATEGORIES, PRODUCTS } from './constants';
import { Product } from './types';
import ShareModal from './components/ShareModal';

const MAX_SLIDES = 5;

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  /* ================= CARROSSEL ================= */
  const carouselProducts = useMemo(() => {
    const now = new Date();
    return PRODUCTS
      .filter(p => new Date(p.validity + 'T23:59:59') >= now && (p.discount ?? 0) > 0)
      .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
      .slice(0, MAX_SLIDES);
  }, []);

  useEffect(() => {
    if (!carouselProducts.length) return;
    const timer = setInterval(() => {
      setCurrentSlide(p => (p + 1) % carouselProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselProducts.length]);

  /* ================= FILTRO ================= */
  const filteredProducts = useMemo(() => {
    const now = new Date();
    return PRODUCTS.filter(p => {
      if (new Date(p.validity + 'T23:59:59') < now) return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOPO */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between">
        <span>Site Oficial PohOfertas</span>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank"><Send size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" className="font-bold flex items-center gap-1">
            <Users size={14} /> Grupo VIP
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 py-3">

          {/* LOGO + CTA */}
          <div className="flex justify-between items-center mb-3">

            {/* LOGO SVG — FIXO */}
            <svg
              viewBox="0 0 220 50"
              className="h-10"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="PohOfertas Logo"
            >
              <g transform="translate(0,5)">
                <path
                  d="M5 20C5 14 9 10 15 10H30L50 30L30 50H15C9 50 5 46 5 40Z"
                  fill="#FF6600"
                  transform="rotate(-15 25 30)"
                />
                <circle cx="18" cy="18" r="3" fill="#fff" />
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
              href="https://wa.me/5511999999999"
              target="_blank"
              className="bg-green-600 text-white px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <Smartphone size={14} /> PEDIR
            </a>
          </div>

          {/* BUSCA */}
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura hoje?"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* CATEGORIAS */}
        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold ${
                activeCategory === cat.id ? 'bg-slate-900 text-white' : 'bg-gray-100'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </nav>
      </header>

      {/* PRODUTOS */}
      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow p-3">
              <img src={p.image} className="h-40 w-full object-contain mb-2" />
              <h3 className="text-xs line-clamp-2">{p.title}</h3>
              <p className="font-black text-lg">R$ {p.newPrice.toFixed(2)}</p>
              <a
                href={p.link}
                target="_blank"
                className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm"
              >
                VER OFERTA
              </a>
            </div>
          ))}
        </div>
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default App;
