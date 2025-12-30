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
     🧠 FUNÇÕES DE TEMPO / SELOS
     ====================================================== */
  const now = new Date();

  const isValid = (p: Product) =>
    new Date(p.validity + 'T23:59:59') >= now;

  const hoursLeft = (p: Product) =>
    (new Date(p.validity + 'T23:59:59').getTime() - now.getTime()) / 36e5;

  const getBadge = (p: Product) => {
    if (p.priority === 1) return { text: '⭐ DESTAQUE', color: 'bg-black' };
    if (hoursLeft(p) <= 24) return { text: '⚠️ EXPIRA HOJE', color: 'bg-red-600' };
    if (hoursLeft(p) <= 72) return { text: '⏳ ÚLTIMAS HORAS', color: 'bg-yellow-500 text-black' };
    if ((p.discount || 0) >= 50) return { text: '💥 MAIOR DESCONTO', color: 'bg-green-600' };
    return null;
  };

  /* ======================================================
     🔥 CARROSSEL (PRIORIDADE + DESCONTO)
     ====================================================== */
  const carouselProducts = useMemo(() => {
    return PRODUCTS
      .filter(isValid)
      .sort((a, b) => {
        const pa = a.priority ?? 2;
        const pb = b.priority ?? 2;
        if (pa !== pb) return pa - pb;
        return (b.discount || 0) - (a.discount || 0);
      })
      .slice(0, MAX_SLIDES);
  }, []);

  useEffect(() => {
    if (!carouselProducts.length) return;
    const t = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % carouselProducts.length);
    }, 4500);
    return () => clearInterval(t);
  }, [carouselProducts.length]);

  /* ======================================================
     🧩 BLOCOS AUTOMÁTICOS
     ====================================================== */
  const ofertasHoje = useMemo(
    () => PRODUCTS.filter(isValid).filter(p => hoursLeft(p) <= 24),
    []
  );

  const maioresDescontos = useMemo(
    () => PRODUCTS.filter(isValid).sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 8),
    []
  );

  const destaques = useMemo(
    () => PRODUCTS.filter(isValid).filter(p => p.priority === 1),
    []
  );

  const gridProdutos = useMemo(() => {
    return PRODUCTS
      .filter(isValid)
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }, [activeCategory, searchQuery]);

  const handleShare = (p: Product) => {
    setSelectedProduct(p);
    setIsShareModalOpen(true);
  };

  const renderGrid = (list: Product[]) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {list.map((p) => {
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
            <img src={p.image} className="w-full h-40 object-contain mb-2" />
            <h3 className="text-xs mb-1 line-clamp-2">{p.title}</h3>
            <p className="font-black text-lg">R$ {p.newPrice.toFixed(2)}</p>
            <a href={p.link} target="_blank" className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm">
              VER OFERTA
            </a>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOPO */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between">
        <span>PohOfertas • Oficial</span>
        <div className="flex gap-3">
          <Instagram size={14} />
          <Facebook size={14} />
          <Send size={14} />
          <Users size={14} />
        </div>
      </div>

      {/* CARROSSEL */}
      {carouselProducts.length > 0 && (
        <section className="px-4 mt-4">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {carouselProducts.map((p, i) => (
              <div key={p.id} className={`${i === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'} transition`}>
                <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <h2 className="text-2xl font-black mb-2">{p.title}</h2>
                  <p className="text-xl font-black">R$ {p.newPrice.toFixed(2)}</p>
                  <a href={p.link} target="_blank" className="inline-block mt-3 bg-white text-black px-5 py-2 rounded-full font-bold">
                    VER OFERTA →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BLOCOS */}
      <main className="max-w-7xl mx-auto px-4 pb-10 space-y-10 mt-10">

        {ofertasHoje.length > 0 && (
          <section>
            <h2 className="font-black text-xl mb-4">⚠️ Ofertas que expiram hoje</h2>
            {renderGrid(ofertasHoje)}
          </section>
        )}

        {destaques.length > 0 && (
          <section>
            <h2 className="font-black text-xl mb-4">⭐ Destaques</h2>
            {renderGrid(destaques)}
          </section>
        )}

        <section>
          <h2 className="font-black text-xl mb-4">💥 Maiores descontos</h2>
          {renderGrid(maioresDescontos)}
        </section>

        <section>
          <h2 className="font-black text-xl mb-4">🛒 Todas as ofertas</h2>
          {renderGrid(gridProdutos)}
        </section>

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
