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

import { CATEGORIES, PRODUCTS, SLIDES } from './constants';
import { Product } from './types';
import ShareModal from './components/ShareModal';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  /* ---------------- SLIDER ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* -------- FILTRO + MAIOR DESCONTO -------- */
  const filteredProducts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity);
        if (validade < today) return false;

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
      .sort((a, b) => {
        const da = Number(a.discount || 0);
        const db = Number(b.discount || 0);
        if (da === 0 && db > 0) return 1;
        if (db === 0 && da > 0) return -1;
        return db - da;
      });
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
              <a
                href="https://ofertas.pohofertas.com.br"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-3 py-2 rounded-full text-xs font-bold"
              >
                🔥 VER OFERTAS
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1"
              >
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

        {/* CATEGORIAS */}
        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 'ofertas') {
                  window.open('https://ofertas.pohofertas.com.br', '_blank');
                  return;
                }
                setActiveCategory(cat.id);
              }}
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
      </header>

      {/* CARROSSEL (RESTAURADO) */}
      <section className="max-w-7xl mx-auto px-4 mt-4 mb-6">
        <div className="relative overflow-hidden rounded-xl">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              } ${slide.color}`}
            >
              <div className="grid grid-cols-2 items-center p-6 text-white">
                <div>
                  <h2 className="text-2xl font-black mb-2">{slide.text}</h2>
                  <p className="mb-4">{slide.sub}</p>
                  <a
                    href={slide.link || 'https://ofertas.pohofertas.com.br'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-bold"
                  >
                    Ver Agora <ArrowRight size={16} />
                  </a>
                </div>
                <img
                  src={slide.img}
                  alt={slide.text}
                  className="max-h-56 object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

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

              <button
                onClick={() => handleShare(p)}
                className="absolute top-2 right-2"
              >
                <LinkIcon size={16} />
              </button>

              <img
                src={p.image || '/placeholder.png'}
                alt={p.title}
                className="w-full h-40 object-contain mb-2"
              />

              <h3 className="text-xs mb-1 line-clamp-2">{p.title}</h3>

              {p.oldPrice > 0 && (
                <p className="text-xs text-gray-400 line-through">
                  R$ {p.oldPrice.toFixed(2)}
                </p>
              )}

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
