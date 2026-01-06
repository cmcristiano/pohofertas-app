import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  Instagram,
  Facebook,
  Link as LinkIcon,
  Home as HomeIcon,
  User,
  ArrowRight,
  RefreshCw,
  Tag,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Zap,
  Sparkles
} from 'lucide-react';

import { Product } from './types';
import ShareModal from './components/ShareModal';

/* ======================================================
   CONFIGURAÇÃO LOCAL DE CATEGORIAS (SEGURA / NÃO DEPENDE
   DE constants.ts)
====================================================== */
const LOCAL_CATEGORIES = [
  { id: 'all', label: 'Tudo' },
  {
    id: 'volta-aulas',
    label: '✏️ Volta às Aulas',
    banner: '/banner-escola.jpg',
    title: 'Volta às Aulas 2026',
    sub: 'Material escolar com preço de atacado 🎒'
  },
  { id: 'achados', label: 'Achadinhos' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'casa', label: 'Casa' },
  { id: 'beleza', label: 'Beleza' },
  { id: 'livros', label: 'Livros' },
  { id: 'moda', label: 'Moda' },
  { id: 'bolsas', label: 'Bolsas' },
  { id: 'bebes', label: 'Infantil' },
  { id: 'brinquedos', label: 'Brinquedos' },
  { id: 'games', label: 'Games' },
  { id: 'esportes', label: 'Esportes' },
  { id: 'ferramentas', label: 'Ferramentas' },
  { id: 'automotivo', label: 'Automotivo' },
  { id: 'alimentos', label: 'Alimentos' },
  { id: 'pets', label: 'Pets' }
];

const SLIDE_COLORS = [
  'bg-gradient-to-r from-orange-600 to-orange-500',
  'bg-gradient-to-r from-blue-600 to-indigo-700',
  'bg-gradient-to-r from-emerald-500 to-green-700',
  'bg-gradient-to-r from-purple-600 to-pink-600',
  'bg-gradient-to-r from-red-600 to-orange-500'
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('volta-aulas');
  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'alpha'>('relevance');
  const [filterStore, setFilterStore] = useState<'all' | 'Amazon' | 'Shopee'>('all');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });

  /* ======================================================
     FETCH DAS PROMOÇÕES (JSON)
====================================================== */
  useEffect(() => {
    async function fetchPromocoes() {
      try {
        const res = await fetch('/promocoes.json?t=' + Date.now());
        if (!res.ok) throw new Error('Erro ao carregar JSON');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPromocoes();
  }, []);

  /* ======================================================
     HERO SLIDES (BANNER + TOP DESCONTOS)
====================================================== */
  const heroSlides = useMemo(() => {
    const categoryConfig =
      LOCAL_CATEGORIES.find(c => c.id === activeCategory) || LOCAL_CATEGORIES[0];

    const mainSlide = {
      id: 'hero-main',
      isFullBanner: true,
      color: SLIDE_COLORS[0],
      text: categoryConfig.title || 'As Melhores Ofertas',
      sub: categoryConfig.sub || 'Garimpadas diariamente para você 🧡',
      img:
        categoryConfig.banner ||
        'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
      link: '#promo-list'
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let valid = products.filter(p => new Date(p.validity) >= today);

    if (
      activeCategory !== 'all' &&
      activeCategory !== 'achados' &&
      activeCategory !== 'volta-aulas'
    ) {
      valid = valid.filter(p => p.category === activeCategory);
    }

    const top = valid
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4)
      .map((p, i) => ({
        id: p.id,
        isFullBanner: false,
        color: SLIDE_COLORS[(i + 1) % SLIDE_COLORS.length],
        text: p.title,
        sub: `🔥 ${p.discount}% OFF`,
        img: p.image,
        link: p.link
      }));

    return [mainSlide, ...top];
  }, [products, activeCategory]);

  useEffect(() => setCurrentSlide(0), [activeCategory]);

  const nextSlide = useCallback(
    () => setCurrentSlide(s => (s + 1) % heroSlides.length),
    [heroSlides.length]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide(s => (s === 0 ? heroSlides.length - 1 : s - 1)),
    [heroSlides.length]
  );

  useEffect(() => {
    if (isHovered || heroSlides.length === 0) return;
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [isHovered, heroSlides.length, nextSlide]);
  /* ======================================================
     FILTRAGEM + ORDENAÇÃO (SEGURA)
  ====================================================== */
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (new Date(p.validity) < new Date().setHours(0, 0, 0, 0)) return false;

      if (activeCategory === 'volta-aulas') {
        if (!['papelaria', 'livros', 'informatica', 'tech', 'mochilas'].includes(p.category))
          return false;
      } else if (activeCategory !== 'all' && activeCategory !== 'achados') {
        if (p.category !== activeCategory) return false;
      }

      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;

      if (filterStore !== 'all' && !p.store.includes(filterStore)) return false;

      return true;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.newPrice - b.newPrice);
    if (sortBy === 'price-desc') result.sort((a, b) => b.newPrice - a.newPrice);
    if (sortBy === 'alpha') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [products, activeCategory, searchQuery, filterStore, sortBy]);

  const handleShare = (p: Product) => {
    setSelectedProduct(p);
    setIsShareModalOpen(true);
  };

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        .hide-scroll::-webkit-scrollbar{display:none}
        .hide-scroll{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* TOPO */}
      <div className="bg-gray-900 text-white text-[10px] py-1 px-3 flex justify-between">
        <span className="font-bold">OFERTAS SELECIONADAS A DEDO 🧡</span>
        <div className="flex gap-3">
          <Instagram size={12} />
          <Facebook size={12} />
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <svg viewBox="0 0 260 50" className="w-[160px] h-[36px]">
            <g transform="translate(0, 5)">
              <path d="M5 20C5 14.4 9.4 10 15 10H30L50 30L30 50H15C9.4 50 5 45.5 5 40V20Z" fill="#FF6600" transform="rotate(-15 25 30)" />
              <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
              <path d="M18 28L24 34L36 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x="60" y="36" fontWeight="800" fontSize="32" fill="#0A192F">PohOfertas</text>
          </svg>

          <div className="relative mt-3">
            <input
              className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-100 text-sm"
              placeholder="Buscar ofertas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <nav className="overflow-x-auto hide-scroll px-4 pb-2">
          <div className="flex gap-2 min-w-max">
            {LOCAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  activeCategory === cat.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* HERO */}
      {heroSlides.length > 0 && (
        <section
          className="relative h-[180px] md:h-[300px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${s.color}`}
            >
              <img src={s.img} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="text-white max-w-xl">
                  <h2 className="text-xl md:text-4xl font-black mb-2">{s.text}</h2>
                  <p className="text-sm md:text-lg mb-4">{s.sub}</p>
                  <a
                    href={s.link}
                    className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold text-xs md:text-sm"
                  >
                    VER AGORA <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}

          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
            <ChevronRight size={20} />
          </button>
        </section>
      )}

      {/* CTA NO MEIO DA PÁGINA (OPÇÃO 1) */}
      <section className="bg-orange-600 text-white py-6 px-4 my-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black">Entre no Grupo VIP 🔥</h3>
            <p className="text-sm opacity-90">
              Receba as melhores ofertas direto no WhatsApp.
            </p>
          </div>
          <a
            href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU"
            target="_blank"
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-black text-sm"
          >
            ENTRAR AGORA
          </a>
        </div>
      </section>
      {/* LISTAGEM DE PRODUTOS */}
      <main className="max-w-7xl mx-auto px-4 pb-24" id="promo-list">
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <RefreshCw className="animate-spin mx-auto mb-2" />
            Carregando ofertas...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ShoppingBag size={40} className="mx-auto mb-2" />
            Nenhuma oferta encontrada.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative hover:shadow-md transition"
              >
                {p.discount > 0 && (
                  <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br">
                    {p.discount}% OFF
                  </span>
                )}

                <button
                  onClick={() => handleShare(p)}
                  className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full hover:bg-orange-50 text-gray-500 hover:text-orange-600 transition"
                >
                  <LinkIcon size={14} />
                </button>

                <div className="h-44 flex items-center justify-center p-4 bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full object-contain transition group-hover:scale-105"
                    loading="lazy"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        'https://placehold.co/200x200')
                    }
                  />
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {p.store}
                  </span>

                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mt-1">
                    {p.title}
                  </h3>

                  <div className="mt-2">
                    {p.oldPrice > 0 && (
                      <div className="text-xs text-gray-400 line-through">
                        R$ {p.oldPrice.toFixed(2)}
                      </div>
                    )}
                    <div className="text-xl font-black text-gray-900">
                      R$ {p.newPrice.toFixed(2)}
                    </div>
                    {p.oldPrice > 0 && (
                      <div className="text-[10px] text-green-600 font-semibold">
                        Economia de R$ {(p.oldPrice - p.newPrice).toFixed(2)}
                      </div>
                    )}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-3 bg-gray-900 hover:bg-orange-600 text-white text-center py-2 rounded-lg font-bold text-xs transition"
                  >
                    PEGAR PROMOÇÃO
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="bg-white border-t py-8 text-center">
        <p className="font-bold text-gray-800">PohOfertas © 2026</p>
        <p className="text-xs text-gray-400 mt-1">
          Preços e disponibilidade podem mudar sem aviso prévio.
        </p>
      </footer>

      {/* NAV MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-50 shadow">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center text-orange-600"
        >
          <HomeIcon size={20} />
          <span className="text-[10px] mt-1 font-medium">Início</span>
        </button>

        <button
          onClick={() => document.querySelector('input')?.focus()}
          className="flex flex-col items-center text-gray-400"
        >
          <Search size={20} />
          <span className="text-[10px] mt-1 font-medium">Buscar</span>
        </button>

        <a
          href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU"
          target="_blank"
          className="flex flex-col items-center text-gray-400"
        >
          <User size={20} />
          <span className="text-[10px] mt-1 font-medium">VIP</span>
        </a>
      </nav>

      {/* MODAL SHARE */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default App;
