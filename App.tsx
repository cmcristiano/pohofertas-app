import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Instagram, 
  Facebook, 
  Send, 
  Users, 
  Smartphone,
  Link as LinkIcon,
  Home,
  User,
  ArrowRight,
  ShoppingBag,
  RefreshCw,
  Flame,
  Tag
} from 'lucide-react';
import { CATEGORIES } from './constants'; 
import { Product } from './types';
import ShareModal from './components/ShareModal';

// Cores vibrantes para o banner (para não ficar branco no branco)
const SLIDE_COLORS = [
  'bg-gradient-to-r from-orange-600 to-red-600', 
  'bg-gradient-to-r from-blue-600 to-indigo-700',   
  'bg-gradient-to-r from-emerald-500 to-green-700',
  'bg-gradient-to-r from-purple-600 to-pink-600', 
  'bg-gradient-to-r from-red-600 to-orange-500',    
];

const App = () => {
  // Estados
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Dados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS DO JSON
  useEffect(() => {
    async function fetchPromocoes() {
      try {
        const response = await fetch('/promocoes.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Erro ao carregar');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro buscando promoções", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPromocoes();
  }, []);

  // 2. LÓGICA DO CARROSSEL (TOP 5 MELHORES DESCONTOS)
  const heroSlides = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validProducts = products.filter(p => {
        const vDate = new Date(p.validity);
        return vDate >= today;
    });

    // Ordena por maior desconto
    const top5 = validProducts.sort((a, b) => b.discount - a.discount).slice(0, 5);

    if (top5.length > 0) {
        return top5.map((p, index) => ({
            id: p.id,
            color: SLIDE_COLORS[index % SLIDE_COLORS.length], 
            text: p.title,
            sub: `🔥 ${p.discount}% OFF | Melhor Oferta do Dia`,
            img: p.image,
            link: p.link
        }));
    }
    return [];
  }, [products]);

  // Timer do Slider
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 3. FILTRO DA GRADE DE PRODUTOS
  const filteredProducts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return products.filter((product) => {
      const validityDate = new Date(product.validity);
      // Remove produtos vencidos
      if (validityDate < today) return false;
      
      // Filtro de Categoria
      if (activeCategory !== 'all') {
         if (activeCategory === 'novos') return true; // Categoria "Novos" mostra tudo
         if (product.category !== activeCategory && activeCategory !== 'achados') return false;
      }

      // Filtro de Busca
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  }, [activeCategory, searchQuery, products]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative font-sans">
      {/* Estilo CSS Global */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF6600; border-radius: 10px; }
      `}</style>

      {/* TOP STRIPE (Barra Superior) */}
      <div className="bg-secondary text-white text-xs py-1.5 px-3 flex justify-between items-center z-50 relative">
        <span className="font-semibold hidden sm:inline">Site Oficial PohOfertas</span>
        <span className="font-semibold sm:hidden">PohOfertas Oficial</span>
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Instagram size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-whatsapp font-bold hover:underline">
            <Users size={14} /> <span className="hidden xs:inline">Grupo VIP</span>
          </a>
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 pt-3 pb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               {/* LOGO SVG OFICIAL (Restaurado!) */}
               <svg viewBox="0 0 260 50" className="w-[160px] md:w-[210px] h-[35px] md:h-[50px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g transform="translate(0, 5)">
                    <path d="M5 20C5 14.4772 9.47715 10 15 10H30L50 30L30 50H15C9.47715 50 5 45.5228 5 40V20Z" fill="#FF6600" transform="rotate(-15 25 30)"/>
                    <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
                    <path d="M18 28L24 34L36 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-5 25 30) translate(2, 2)"/>
                 </g>
                 <text x="60" y="36" fontFamily="Segoe UI, sans-serif" fontWeight="800" fontSize="32" fill="#0A192F" letterSpacing="-0.5">PohOfertas</text>
               </svg>
            </div>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="bg-whatsapp text-white px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:shadow-md transition active:scale-95">
              <Smartphone size={16} /> <span className="hidden sm:inline">PEDIR OFERTA</span><span className="sm:hidden">PEDIR</span>
            </a>
          </div>

          <div className="relative w-full mt-2">
            <input 
              type="text" 
              placeholder="Buscar ofertas..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent focus:bg-white focus:border-primary rounded-lg outline-none text-sm transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* MENU DE CATEGORIAS */}
        <nav className="border-t border-gray-100 bg-white py-2 w-full overflow-x-auto custom-scrollbar">
          <div className="flex px-4 gap-3 min-w-max pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] py-2 rounded-lg transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-secondary text-white border-secondary shadow-md scale-105' 
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:border-gray-200'
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide truncate w-full text-center px-1">{cat.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* CARROSSEL (Só aparece se tiver ofertas) */}
      {heroSlides.length > 0 && (
        <section className="relative w-full h-[200px] md:h-[340px] overflow-hidden bg-gray-100">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.color}`}
            >
              <div className="container mx-auto h-full px-6 md:px-12 flex items-center justify-between">
                <div className="flex flex-col items-start text-white w-[65%] z-10">
                   <span className="bg-black/30 border border-white/20 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase mb-2 flex items-center gap-1 backdrop-blur-md">
                     <Flame size={12} className="text-yellow-400" fill="currentColor" /> Destaque Top {index + 1}
                   </span>
                   <h2 className="text-lg md:text-4xl font-black drop-shadow-md mb-2 leading-tight line-clamp-2">
                     {slide.text}
                   </h2>
                   <p className="text-xs md:text-lg font-medium bg-black/20 px-3 py-1 rounded-lg mb-4 backdrop-blur-sm">
                     {slide.sub}
                   </p>
                   <a href={slide.link} target="_blank" rel="noreferrer" className="bg-white text-secondary hover:bg-gray-100 font-bold py-2 px-5 rounded-full text-xs md:text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-1">
                     Ver Oferta <ArrowRight size={14} />
                   </a>
                </div>
                <div className="w-[35%] h-full flex items-center justify-center relative">
                   <div className="bg-white rounded-full w-28 h-28 md:w-64 md:h-64 flex items-center justify-center shadow-2xl overflow-hidden p-3 transform rotate-3 ring-4 ring-white/30">
                      <img src={slide.img} alt="Oferta" className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=POH'; }} />
                   </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
             {heroSlides.map((_, i) => (
               <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all shadow-sm ${i === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-2'}`} />
             ))}
          </div>
        </section>
      )}

      {/* GRID DE PRODUTOS */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2 border-b pb-2">
          <Tag className="text-primary" size={20} /> Ofertas do Momento
        </h2>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-pulse">
              <RefreshCw size={40} className="animate-spin mb-4 text-primary" />
              <p>Buscando descontos...</p>
           </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <ShoppingBag size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">Nenhuma oferta encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative">
                
                {/* Badge Desconto */}
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-br-lg z-10 shadow-sm">
                  {product.discount}% OFF
                </div>

                {/* Botão Share */}
                <button onClick={() => handleShare(product)} className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-secondary shadow-md hover:bg-primary hover:text-white transition z-10">
                  <LinkIcon size={16} />
                </button>

                {/* --- A CORREÇÃO DE IMAGEM ESTÁ AQUI --- */}
                {/* h-48: Define altura fixa de 192px para a área da imagem.
                   object-contain: Garante que a imagem caiba inteira sem cortar.
                   p-4: Dá respiro nas bordas.
                */}
                <div className="w-full h-48 bg-white p-4 flex items-center justify-center border-b border-gray-50 relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy" 
                    onError={(e) => {(e.target as HTMLImageElement).src = 'https://placehold.co/200?text=Sem+Img';}} 
                  />
                </div>

                {/* INFO DO PRODUTO */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-9 leading-tight" title={product.title}>{product.title}</h3>
                  <div className="mt-auto">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">
                        <ShoppingBag size={10} /><span>{product.store}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-through">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-xs text-secondary font-bold">R$</span>
                      <span className="text-xl md:text-2xl font-black text-secondary">{product.newPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <a href={product.link} target="_blank" rel="noreferrer" className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-sm transition shadow-md active:scale-95">
                      PEGAR PROMOÇÃO
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 pt-8 pb-24 md:pb-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs max-w-2xl mx-auto mb-4"><strong>Aviso:</strong> O PohOfertas é um agregador de promoções. Preços e disponibilidade sujeitos a alteração pelas lojas.</p>
          <div className="text-secondary font-bold text-sm">&copy; 2025 PohOfertas.</div>
        </div>
      </footer>

      {/* MENU MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button onClick={() => { setActiveCategory('all'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex flex-col items-center text-primary">
          <Home size={22} /><span className="text-[10px] font-medium mt-1">Início</span>
        </button>
        <button onClick={() => { document.querySelector('input')?.focus(); }} className="flex flex-col items-center text-gray-400 hover:text-primary transition">
          <Search size={22} /><span className="text-[10px] font-medium mt-1">Buscar</span>
        </button>
        <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" rel="noreferrer" className="flex flex-col items-center text-gray-400 hover:text-whatsapp transition">
          <User size={22} /><span className="text-[10px] font-medium mt-1">Grupo VIP</span>
        </a>
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

export default App;
