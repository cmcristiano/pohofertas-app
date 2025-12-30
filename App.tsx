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
const NOVOS_DIAS = 7;

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  /* ================================
     🔥 CARROSSEL (TOP DESCONTOS)
     ================================ */
  const carouselProducts = useMemo(() => {
    const now = new Date();
    return PRODUCTS
      .filter(p => new Date(p.validity + 'T23:59:59') >= now && (p.discount || 0) > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, MAX_SLIDES);
  }, []);

  useEffect(() => {
    if (!carouselProducts.length) return;
    const t = setInterval(() => {
      setCurrentSlide(p => (p === carouselProducts.length - 1 ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(t);
  }, [carouselProducts.length]);

  /* ================================
     🛒 FILTRO GERAL (BLINDADO)
     ================================ */
  const filteredProducts = useMemo(() => {
    const now = new Date();
    const limiteNovos = new Date();
    limiteNovos.setDate(now.getDate() - NOVOS_DIAS);

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        if (validade < now) return false;

        if (activeCategory === 'novos') {
          return new Date(Number(p.id)) >= limiteNovos;
        }

        if (activeCategory === 'descontos') {
          return (p.discount || 0) >= 30;
        }

        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        if (
          searchQuery &&
          !p.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) return false;

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
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between">
        <span>Site Oficial PohOfertas</span>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank"><Send size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" className="flex gap-1 font-bold">
            <Users size={14} /> Grupo VIP
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between mb-3">
            <strong className="text-xl">PohOfertas</strong>
            <div className="flex gap-2">
              <a href="https://ofertas.pohofertas.com.br" target="_blank" className="bg-black text-white px-3 py-2 rounded-full text-xs font-bold">
                🔥 VER OFERTAS
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" className="bg-green-600 text-white px-3 py-2 rounded-full text-xs font-bold flex gap-1">
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

          <button
            onClick={() => setActiveCategory('novos')}
            className={`px-3 py-2 rounded-lg text-xs font-bold ${
              activeCategory === 'novos' ? 'bg-slate-900 text-white' : 'bg-gray-100'
            }`}
          >
            ✨ Novos
          </button>

          <button
            onClick={() => setActiveCategory('descontos')}
            className={`px-3 py-2 rounded-lg text-xs font-bold ${
              activeCategory === 'descontos' ? 'bg-slate-900 text-white' : 'bg-gray-100'
            }`}
          >
            💥 Descontos
          </button>
        </nav>
      </header>

      {/* CARROSSEL */}
      {carouselProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-4 mb-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {carouselProducts.map((p, index) => (
              <div
                key={p.id}
                className={`${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'} bg-gradient-to-r from-orange-500 to-orange-600 transition-all`}
              >
                <div className="grid md:grid-cols-2 gap-6 p-6 text-white">
                  <div>
                    <span className="bg-black/80 px-3 py-1 rounded-full text-xs font-bold">
                      🔥 {p.discount}% OFF
                    </span>
                    <h2 className="text-2xl font-black my-3">{p.title}</h2>
                    <p className="text-3xl font-black">R$ {p.newPrice.toFixed(2)}</p>
                    <a href={p.link} target="_blank" className="inline-flex mt-4 bg-white text-black px-5 py-3 rounded-full font-bold">
                      VER OFERTA <ArrowRight size={16} />
                    </a>
                  </div>
                  <div className="flex justify-center">
                    <img src={p.image} className="max-h-[200px] object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
              <img src={p.image} className="w-full h-40 object-contain mb-2" />
              <h3 className="text-xs line-clamp-2">{p.title}</h3>
              <p className="font-black text-lg">R$ {p.newPrice.toFixed(2)}</p>
              <a href={p.link} target="_blank" className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm">
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
