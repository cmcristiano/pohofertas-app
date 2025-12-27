import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  Instagram, 
  Facebook, 
  Send, 
  Users, 
  MessageSquare,
  Smartphone,
  Link as LinkIcon,
  Home,
  User,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, SLIDES } from './constants';
import { Product } from './types';
import ShareModal from './components/ShareModal';

const App = () => {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Auto-rotate slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter Products Logic
  // 1. Date Validity Check (Auto-Delete)
  // 2. Category Filter
  // 3. Search Filter
  const filteredProducts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return PRODUCTS.filter((product) => {
      // Auto-Delete check
      const validityDate = new Date(product.validity);
      if (validityDate < today) return false;

      // Category check
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;

      // Search check
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* A) TOP STRIPE */}
      <div className="bg-secondary text-white text-xs py-1.5 px-3 flex justify-between items-center z-50 relative">
        <span className="font-semibold hidden sm:inline">Site Oficial PohOfertas</span>
        <span className="font-semibold sm:hidden">PohOfertas Oficial</span>
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Send size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-whatsapp font-bold hover:underline">
            <Users size={14} /> <span className="hidden xs:inline">Grupo VIP</span>
          </a>
        </div>
      </div>

      {/* B) HEADER (Sticky) */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 pt-3 pb-2">
          {/* Line 1 & CTA */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
               {/* Logo SVG Inline */}
               <svg 
                 viewBox="0 0 220 50" 
                 className="w-[180px] md:w-[210px] h-[40px] md:h-[50px]" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg"
                 role="img"
                 aria-label="PohOfertas Logo"
               >
                 {/* Icon Group */}
                 <g transform="translate(0, 5)">
                    {/* Orange Tag Shape */}
                    <path 
                      d="M5 20C5 14.4772 9.47715 10 15 10H30L50 30L30 50H15C9.47715 50 5 45.5228 5 40V20Z" 
                      fill="#FF6600" 
                      transform="rotate(-15 25 30)"
                    />
                    {/* Tag Hole */}
                    <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
                    {/* Checkmark inside tag */}
                    <path 
                      d="M18 28L24 34L36 18" 
                      stroke="white" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      transform="rotate(-5 25 30) translate(2, 2)"
                    />
                 </g>
                 
                 {/* Text: PohOfertas */}
                 <text 
                   x="60" 
                   y="36" 
                   fontFamily="'Segoe UI', Roboto, sans-serif" 
                   fontWeight="800" 
                   fontSize="32" 
                   fill="#0A192F" 
                   letterSpacing="-0.5"
                 >
                   PohOfertas
                 </text>
               </svg>
            </div>
            
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noreferrer"
              className="bg-whatsapp text-white px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:shadow-md transition active:scale-95"
            >
              <Smartphone size={16} />
              <span className="hidden sm:inline">PEDIR OFERTA</span>
              <span className="sm:hidden">PEDIR</span>
            </a>
          </div>

          {/* Slogan */}
          <div className="text-center mb-3">
             <p className="text-[10px] sm:text-xs font-bold text-secondary tracking-widest border-b border-gray-100 pb-1 inline-block">
               SELEÇÃO OFICIAL DAS MELHORES OPORTUNIDADES
             </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="O que você procura hoje?" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent focus:bg-white focus:border-primary rounded-lg outline-none text-sm transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* C) CATEGORY NAVIGATION (Scroll Snap) */}
        <nav className="border-t border-gray-100 bg-white py-2 overflow-x-auto hide-scrollbar snap-x cursor-grab">
          <div className="flex px-4 gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  snap-start flex flex-col items-center justify-center min-w-[70px] py-1.5 rounded-lg transition-all
                  ${activeCategory === cat.id 
                    ? 'bg-secondary text-white shadow-md scale-105' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                `}
              >
                <span className="text-lg mb-0.5">{cat.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide">{cat.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* D) BANNER ROTATIVO (Slider) */}
      <section className="relative w-full h-[180px] md:h-[320px] overflow-hidden bg-gray-100">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } ${slide.color}`}
          >
            <div className="container mx-auto h-full px-6 md:px-12 flex items-center justify-between">
              {/* Text Content */}
              <div className="flex flex-col items-start text-white w-[60%] z-10">
                 <h2 className="text-2xl md:text-5xl font-black drop-shadow-md mb-2 leading-tight">
                   {slide.text}
                 </h2>
                 <p className="text-xs md:text-xl font-medium bg-black/20 px-3 py-1 rounded-lg mb-4 backdrop-blur-sm">
                   {slide.sub}
                 </p>
                 <a 
                   href={slide.link}
                   className="bg-white text-secondary hover:bg-gray-100 font-bold py-1.5 px-4 md:py-2 md:px-6 rounded-full text-xs md:text-sm shadow-lg transition transform hover:scale-105 flex items-center gap-1"
                 >
                   Ver Agora <ArrowRight size={14} />
                 </a>
              </div>
              
              {/* Image with White Background Container */}
              <div className="w-[40%] h-full flex items-center justify-center relative">
                 <div className="bg-white rounded-full w-32 h-32 md:w-64 md:h-64 flex items-center justify-center shadow-2xl overflow-hidden p-4 transform rotate-3 hover:rotate-0 transition duration-500">
                    <img 
                      src={slide.img} 
                      alt={slide.text} 
                      className="w-full h-full object-contain"
                    />
                 </div>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
               {SLIDES.map((_, i) => (
                 <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all shadow-sm ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'}`} 
                 />
               ))}
            </div>
          </div>
        ))}
      </section>

      {/* E) GRID DE PRODUTOS */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
          <span className="bg-primary w-1 h-6 rounded-r"></span>
          Ofertas em Destaque
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Nenhuma oferta encontrada nesta categoria ou busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative card produto-item ${product.category}`}
                data-validade={product.validity}
              >
                {/* Discount Tag */}
                <div className="absolute top-0 left-0 bg-whatsapp text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-br-lg z-10 shadow-sm">
                  {product.discount}% OFF
                </div>

                {/* Share Floating Button */}
                <button 
                  onClick={() => handleShare(product)}
                  className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-secondary shadow-md hover:bg-primary hover:text-white transition z-10"
                >
                  <LinkIcon size={16} />
                </button>

                {/* Image */}
                <div className="w-full aspect-square p-4 bg-white flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-xs md:text-sm font-medium text-gray-700 line-clamp-2 mb-2 h-10">
                    {product.title}
                  </h3>
                  
                  <div className="mt-auto">
                    {/* Store Indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                       <ShoppingBag size={12} />
                       <span>{product.store}</span>
                    </div>

                    <p className="text-xs text-gray-400 line-through">
                      R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                    </p>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-xs text-secondary">R$</span>
                      <span className="text-xl md:text-2xl font-black text-secondary">
                        {product.newPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full block text-center bg-primary text-white font-bold py-2 rounded-lg text-sm hover:bg-orange-600 transition shadow-md active:scale-95"
                    >
                      VER OFERTA
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* F) RODAPÉ */}
      <footer className="bg-white border-t border-gray-200 pt-8 pb-24 md:pb-8 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto mb-4">
            <strong>Disclaimer:</strong> O PohOfertas é um site parceiro e afiliado. Os preços e a disponibilidade dos produtos podem sofrer alterações sem aviso prévio por parte dos varejistas. Verifique sempre o preço final na loja parceira.
          </p>
          <div className="text-secondary font-bold text-sm">
            &copy; 2024 PohOfertas. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile Fixed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50 pb-safe">
        <button 
          onClick={() => { setActiveCategory('all'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
          className="flex flex-col items-center text-primary"
        >
          <Home size={22} />
          <span className="text-[10px] font-medium mt-1">Início</span>
        </button>
        <button 
          onClick={() => { document.querySelector('input')?.focus(); }}
          className="flex flex-col items-center text-gray-400 hover:text-primary transition"
        >
          <Search size={22} />
          <span className="text-[10px] font-medium mt-1">Buscar</span>
        </button>
        <a 
          href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center text-gray-400 hover:text-whatsapp transition"
        >
          <User size={22} />
          <span className="text-[10px] font-medium mt-1">Grupo VIP</span>
        </a>
      </nav>

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default App;