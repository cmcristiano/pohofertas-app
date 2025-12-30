import React, { useEffect, useMemo, useState } from 'react';
import {
  Instagram,
  Facebook,
  Send,
  Users,
  Smartphone,
  Link as LinkIcon,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { CATEGORIES, PRODUCTS } from './constants';
import { Product } from './types';
import ShareModal from './components/ShareModal';

const MAX_SLIDES = 5;

const App = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* ======================================================
     🔥 CARROSSEL – TOP DESCONTOS VÁLIDOS + MAIS NOVOS
     (em empate de desconto, pega os mais recentes pelo id)
     ====================================================== */
  const carouselProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        return validade >= now && (p.discount ?? 0) > 0;
      })
      .sort((a, b) => {
        const da = b.discount ?? 0;
        const db = a.discount ?? 0;
        if (da !== db) return da - db; // desc
        // empate de desconto: mais novo primeiro
        const ida = Number(b.id) || 0;
        const idb = Number(a.id) || 0;
        return ida - idb;
      })
      .slice(0, MAX_SLIDES);
  }, []);

  const goNext = () => {
    if (carouselProducts.length === 0) return;
    setCurrentSlide((prev) => (prev === carouselProducts.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    if (carouselProducts.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? carouselProducts.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (carouselProducts.length === 0) return;
    if (isPaused) return;

    const timer = setInterval(() => {
      goNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [carouselProducts.length, isPaused]);

  /* ======================================================
     🛒 FILTRO PRINCIPAL + ORDENAÇÃO POR DESCONTO
     ====================================================== */
  const filteredProducts = useMemo(() => {
    const now = new Date();

    return PRODUCTS
      .filter((p) => {
        const validade = new Date(p.validity + 'T23:59:59');
        if (validade < now) return false;

        if (activeCategory !== 'all' && p.category !== activeCategory) return false;

        if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  }, [activeCategory, searchQuery]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= TOPO ================= */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>PohOfertas • Oficial</span>
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
      <header className="bg-white sticky top-0 z-50 shadow">
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
        <nav className="flex gap-2 px-4 pb-3 overflow-x-auto whitespace-nowrap bg-white">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
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

      {/* ================= CARROSSEL (MELHORADO) ================= */}
      {carouselProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-4 mb-6">
          <div
            className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-600"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* topo do carrossel */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-black/80 text-white text-xs px-3 py-1 rounded-full font-bold">
                💥 Destaques do dia
              </span>
            </div>

            {/* setas */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow"
              aria-label="Anterior"
              title="Anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow"
              aria-label="Próximo"
              title="Próximo"
            >
              <ChevronRight size={18} />
            </button>

            {/* slides */}
            <div className="relative min-h-[220px] md:min-h-[280px]">
              {carouselProducts.map((p, index) => (
                <div
                  key={p.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 md:p-10 text-white">
                    <div>
                      <span className="inline-block bg-black/80 text-xs px-3 py-1 rounded-full mb-3 font-bold">
                        🔥 {p.discount}% OFF • {p.store ?? 'Oferta'}
                      </span>

                      <h2 className="text-xl md:text-3xl font-black leading-tight mb-3 line-clamp-2">
                        {p.title}
                      </h2>

                      <div className="flex items-center gap-3 mb-4">
                        {p.oldPrice > 0 && (
                          <span className="text-sm line-through opacity-80">
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
                        className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-black text-sm hover:scale-[1.03] transition"
                      >
                        VER OFERTA <ArrowRight size={16} />
                      </a>

                      {/* dica pro usuário */}
                      <div className="mt-3 text-xs opacity-90">
                        {isPaused ? '⏸️ Pausado pra você ler' : '▶️ Rodando automático'}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-white/15 rounded-2xl p-4 md:p-5 backdrop-blur-sm">
                        <img
                          src={p.image || '/placeholder.png'}
                          alt={p.title}
                          className="max-h-[170px] md:max-h-[230px] w-auto object-contain drop-shadow-xl"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* bolinhas */}
            <div className="flex justify-center gap-2 pb-4">
              {carouselProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === currentSlide ? 'bg-white' : 'bg-white/40'
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>
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

                <button onClick={() => handleShare(p)} className="absolute top-2 right-2">
                  <LinkIcon size={16} />
                </button>

                <img
                  src={p.image || '/placeholder.png'}
                  alt={p.title}
                  className="w-full h-40 object-contain mb-2"
                  loading="lazy"
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
