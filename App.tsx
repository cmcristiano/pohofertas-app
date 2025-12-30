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

  /* ======================================================
     🧠 FUNÇÕES DE INTELIGÊNCIA
     ====================================================== */
  const getBadge = (p: Product) => {
    const now = new Date();
    const validade = new Date(p.validity + 'T23:59:59');
    const diffHours = (validade.getTime() - now.getTime()) / 1000 / 60 / 60;

    if (p.priority === 1) return { text: '🔥 DESTAQUE', color: 'bg-black' };
    if (diffHours <= 24 && diffHours > 0) return { text: '⚠️ EXPIRA HOJE', color: 'bg-red-600' };
    if (diffHours <= 72 && diffHours > 24) return { text: '⏳ ÚLTIMAS HORAS', color: 'bg-yellow-500 text-black' };
    if ((p.discount || 0) >= 50) return { text: '💥 MAIOR DESCONTO', color: 'bg-green-600' };

    return null;
  };

  /* ======================================================
     🔥 CARROSSEL INTELIGENTE
     ====================================================== */
  const carouselProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => new Date(p.validity + 'T23:59:59') >= now)
      .sort((a, b) => {
        const pa = a.priority ?? 2;
        const pb = b.priority ?? 2;
        if (pa !== pb) return pa - pb;
        return (b.discount || 0) - (a.discount || 0);
      })
      .slice(0, MAX_SLIDES);
  }, []);

  useEffect(() => {
    if (carouselProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselProducts.length - 1 ? 0 : prev + 1
      );
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselProducts.length]);

  /* ======================================================
     🛒 GRID DE PRODUTOS
     ====================================================== */
  const filteredProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        if (validade < now) return false;
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        const pa = a.priority ?? 2;
        const pb = b.priority ?? 2;
        if (pa !== pb) return pa - pb;
        return (b.discount || 0) - (a.discount || 0);
      });
  }, [activeCategory, searchQuery]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER TOPO ================= */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>Site Oficial PohOfertas</span>
        <div className="flex gap-3 items-center">
          <Instagram size={14} />
          <Facebook size={14} />
          <Send size={14} />
          <Users size={14} />
        </div>
      </div>

      {/* ================= CARROSSEL ================= */}
      {carouselProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-4 mb-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {carouselProducts.map((p, index) => {
              const badge = getBadge(p);
              return (
                <div
                  key={p.id}
                  className={`transition-all duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  } bg-gradient-to-r from-orange-500 to-orange-600`}
                >
                  <div className="p-6 text-white relative">
                    {badge && (
                      <span className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-bold ${badge.color}`}>
                        {badge.text}
                      </span>
                    )}
                    <h2 className="text-2xl font-black mb-2">{p.title}</h2>
                    <p className="text-xl font-black">R$ {p.newPrice.toFixed(2)}</p>
                    <a href={p.link} target="_blank" rel="noreferrer" className="inline-block mt-3 bg-white text-black px-5 py-2 rounded-full font-bold">
                      VER OFERTA →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= GRID ================= */}
      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const badge = getBadge(p);
            return (
              <div key={p.id} className="bg-white rounded-xl shadow p-3 relative">
                {badge && (
                  <span className={`absolute top-0 left-0 text-xs px-2 py-1 rounded-br font-bold ${badge.color}`}>
                    {badge.text}
                  </span>
                )}

                <button onClick={() => handleShare(p)} className="absolute top-2 right-2">
                  <LinkIcon size={16} />
                </button>

                <img src={p.image} alt={p.title} className="w-full h-40 object-contain mb-2" />
                <h3 className="text-xs mb-1 line-clamp-2">{p.title}</h3>
                <p className="font-black text-lg">R$ {p.newPrice.toFixed(2)}</p>
                <a href={p.link} target="_blank" rel="noreferrer" className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm">
                  VER OFERTA
                </a>
              </div>
            );
          })}
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
