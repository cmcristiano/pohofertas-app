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

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  /* ================= CARROSSEL ================= */
  const carouselProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        return validade >= now && (p.discount || 0) > 0;
      })
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
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

  /* ================= FILTRO ================= */
  const filteredProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        if (validade < now) return false;

        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        if (
          searchQuery &&
          !p.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }, [activeCategory, searchQuery]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOPO */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>Site Oficial PohOfertas</span>
        <div className="flex gap-3 items-center">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank" rel="noreferrer"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank" rel="noreferrer"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank" rel="noreferrer"><Send size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" rel="noreferrer" className="font-bold flex items-center gap-1">
            <Users size={14} /> Grupo VIP
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <strong className="text-xl">PohOfertas</strong>
            <div className="flex gap-2">
              <a href="https://ofertas.pohofertas.com.br" target="_blank" rel="noreferrer" className="bg-black text-white px-3 py-2 rounded-full text-xs font-bold">
                🔥 VER OFERTAS
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="bg-green-600 text-white px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1">
                <Smartphone size={14} /> PEDIR
              </a>
            </div>
          </div>

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura hoje?"
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
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
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-3 relative">
              {p.discount > 0 && (
                <span className="absolute top-0 left-0 bg-green-600 text-white text-xs px-2 py-1 rounded-br">
                  {p.discount}% OFF
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
