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
     🔥 CARROSSEL AUTOMÁTICO (TOP DESCONTOS VÁLIDOS)
     ====================================================== */
  const carouselProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        // 🔒 CORREÇÃO DEFINITIVA DE FUSO HORÁRIO
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

  /* ======================================================
     🛒 FILTRO PRINCIPAL + ORDENAÇÃO
     ====================================================== */
  const filteredProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        // 🔒 CORREÇÃO DEFINITIVA DE FUSO HORÁRIO
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
      .sort((a, b) => {
        const da = a.discount || 0;
        const db = b.discount || 0;
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

      {/* ================= TOPO ================= */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>Site Oficial PohOfertas</span>
        <div className="flex gap-3 items-center">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank" rel="noreferrer"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank" rel="noreferrer"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank" rel="noreferrer"><Send size={14} /></a>
          <a
            href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU"
            target="_blank"
            rel="noreferrer"
            className="font-bold flex items-center gap-1"
          >
            <Users size={14} /> Grupo VIP
          </a>
        </div>
      </div>

      {/* ================= HEADER ================= */}
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

        {/* ================= CATEGORIAS ================= */}
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

      {/* ================= CARROSSEL ================= */}
      {carouselProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-4 mb-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {carouselProducts.map((p, index) => (
              <div
                key={p.id}
                className={`transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-10'
                } bg-gradient-to-r from-orange-500 to-orange-600`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 md:p-10 text-white min-h-[220px] md:min-h-[260px]">
                  <div>
                    <span className="inline-block bg-black/80 text-xs px-3 py-1 rounded-full mb-3 font-bold">
                      🔥 {p.discount}% OFF
                    </span>

                    <h2 className="text-xl md:text-3xl font-black leading-tight mb-3 line-clamp-2">
                      {p.title}
                    </h2>

                    <div className="flex items-center gap-3 mb-4">
                      {p.oldPrice > 0 && (
                        <span className="text-sm line-through opacity-70">
                          R$ {p.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl md:text-3xl font-black">
                        R$ {p.newPrice.toFixed(2)}
                      </span>
                    </div>

                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-black text-sm hover:scale-105 transition"
                    >
                      VER OFERTA <ArrowRight size={16} />
                    </a>
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={p.image || '/placeholder.png'}
                      alt={p.title}
                      className="max-h-[180px] md:max-h-[220px] object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PRODUTOS ================= */}
      <main className="max-w-7xl mx-auto px-4 pb-10">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma oferta disponível no momento.
          </p>
        ) : (
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
        )}
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
