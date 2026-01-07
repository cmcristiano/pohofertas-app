import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Search, Instagram, Facebook, Link as LinkIcon, Home as HomeIcon, User, 
  ArrowRight, RefreshCw, Tag, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight,
  ShoppingBag, Zap, Sparkles, Star, Quote
} from 'lucide-react';
import { Product } from './types';
import ShareModal from './components/ShareModal';

// --- CONFIGURAÇÃO DAS CATEGORIAS (ATUALIZADO V31.1) ---
const LOCAL_CATEGORIES = [
  { id: 'all', label: 'Tudo' },
  { id: 'volta-aulas', label: '✏️ Volta às Aulas', banner: '/banner-escola.jpg', title: 'Volta às Aulas 2026', sub: 'Material Escolar com Preço de Atacado 🎒' },
  { id: 'papelaria', label: '✂️ Papelaria', banner: 'https://images.unsplash.com/photo-1531297461136-82lwDe402434?auto=format&fit=crop&q=80&w=2070', title: 'Escritório & Estudos', sub: 'Cadernos, Canetas e Organização ✂️' }, // ADICIONADO
  { id: 'achados', label: 'Achadinhos', banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070', title: 'Achadinhos Imperdíveis', sub: 'As melhores ofertas da Shopee e Amazon 🔥' },
  { id: 'tech', label: 'Tecnologia', banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070', title: 'Mundo Tech', sub: 'Gadgets, Celulares e Acessórios com Desconto 💻' },
  { id: 'calcados', label: '👟 Calçados', banner: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070', title: 'Sneakers & Calçados', sub: 'Conforto e estilo para seus pés 👟' }, // ADICIONADO
  { id: 'cozinha', label: 'Cozinha', banner: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=2070', title: 'Chef em Casa', sub: 'Tudo para equipar sua cozinha 🍳' },
  { id: 'casa', label: 'Casa', banner: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=2070', title: 'Casa & Conforto', sub: 'Decoração e utilidades para o seu lar 🏠' },
  { id: 'beleza', label: 'Beleza', banner: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=2070', title: 'Cuidados & Beleza', sub: 'Skincare, Maquiagem e Perfumes ✨' },
  { id: 'livros', label: 'Livros', banner: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=2070', title: 'Estante Literária', sub: 'Os melhores títulos com desconto 📚' },
  { id: 'moda', label: 'Moda', banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070', title: 'Estilo & Tendência', sub: 'Roupas e acessórios para você brilhar 👗' },
  { id: 'bolsas', label: 'Bolsas', banner: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=2070', title: 'Bolsas & Acessórios', sub: 'Complete seu look com elegância 👜' },
  { id: 'bebes', label: 'Infantil', banner: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=2070', title: 'Mundo dos Pequenos', sub: 'Fraldas, Roupas e Carinho 👶' },
  { id: 'brinquedos', label: 'Brinquedos', banner: 'https://images.unsplash.com/photo-1566576912902-1b6b7dd88d02?auto=format&fit=crop&q=80&w=2070', title: 'Hora da Diversão', sub: 'Brinquedos para todas as idades 🧸' },
  { id: 'games', label: 'Games', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070', title: 'Zona Gamer', sub: 'Consoles, Jogos e Periféricos 🎮' },
  { id: 'saude', label: 'Saúde', banner: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2070', title: 'Saúde & Bem-Estar', sub: 'Vitaminas e cuidados pessoais 💊' },
  { id: 'esportes', label: 'Esportes', banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2070', title: 'Vida Fitness', sub: 'Equipamentos e roupas esportivas ⚽' },
  { id: 'ferramentas', label: 'Ferramentas', banner: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2070', title: 'Faça Você Mesmo', sub: 'Ferramentas profissionais e hobby 🛠️' },
  { id: 'automotivo', label: 'Automotivo', banner: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070', title: 'Seu Carro Merece', sub: 'Acessórios e cuidados automotivos 🚗' },
  { id: 'alimentos', label: 'Alimentos', banner: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=2070', title: 'Mercado em Casa', sub: 'Snacks, Bebidas e Despensa 🍫' },
  { id: 'pets', label: 'Pets', banner: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2070', title: 'Amor de 4 Patas', sub: 'Ração, Brinquedos e Mimos 🐶' },
];

const SLIDE_COLORS = [
  'bg-gradient-to-r from-orange-600 to-orange-500', 
  'bg-gradient-to-r from-blue-600 to-indigo-700',    
  'bg-gradient-to-r from-emerald-500 to-green-700',
  'bg-gradient-to-r from-purple-600 to-pink-600', 
  'bg-gradient-to-r from-red-600 to-orange-500',      
];

// --- NOVOS DEPOIMENTOS ---
const TESTIMONIALS = [
  { name: 'Fernanda L.', store: 'Shein', text: 'O vestido pro Ano Novo ficou perfeito! O tecido é ótimo e paguei super barato seguindo a dica.', avatar: 'FL' },
  { name: 'Mariana S.', store: 'Shopee', text: 'Segui a dica do Cris e peguei a AirFryer com 40% de desconto. Chegou certinho!', avatar: 'MS' },
  { name: 'Ricardo M.', store: 'Amazon', text: 'Comprei o Kindle na promoção que vi aqui no PohOfertas. A entrega foi surreal de rápida.', avatar: 'RM' },
  { name: 'João P.', store: 'Mercado Livre', text: 'Celular novo chegou no dia seguinte com o cupom que peguei no grupo VIP. Top!', avatar: 'JP' },
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('volta-aulas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // ESTADOS DE FILTRO
  const [sortBy, setSortBy] = useState('relevance');
  const [filterStore, setFilterStore] = useState('all');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // ESTADO DO FORMULÁRIO DE LEADS
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromocoes() {
      try {
        const response = await fetch('/promocoes.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Erro');
        const data = await response.json();
        setProducts(data);
      } catch (error) { setProducts([]); } finally { setLoading(false); }
    }
    fetchPromocoes();
  }, []);

  const heroSlides = useMemo(() => {
    const currentCatConfig = LOCAL_CATEGORIES.find(c => c.id === activeCategory) || LOCAL_CATEGORIES[0];
    
    // Banner Principal
    let mainSlide = {
        id: 'main-hero', 
        color: SLIDE_COLORS[0],
        text: currentCatConfig.title || 'As Melhores Ofertas', 
        sub: currentCatConfig.sub || 'Garimpadas diariamente para você 🧡',
        img: currentCatConfig.banner || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070', 
        link: '#promo-list',
        isFullBanner: true 
    };

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const valid = products.filter(p => new Date(p.validity) >= today);
    let categoryProducts = valid;
    if (activeCategory !== 'all' && activeCategory !== 'novos' && activeCategory !== 'achados' && activeCategory !== 'volta-aulas') {
        categoryProducts = valid.filter(p => p.category === activeCategory);
    }
    
    const top4 = categoryProducts.sort((a, b) => b.discount - a.discount).slice(0, 4);
    const productSlides = top4.map((p, i) => ({
        id: p.id, color: SLIDE_COLORS[(i + 1) % SLIDE_COLORS.length], 
        text: p.title, sub: `🔥 ${p.discount}% OFF | Oferta Relâmpago`, img: p.image, link: p.link, isFullBanner: false 
    }));
    return [mainSlide, ...productSlides];
  }, [products, activeCategory]);

  useEffect(() => { setCurrentSlide(0); }, [activeCategory]);
  const nextSlide = useCallback(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, [heroSlides.length]);
  const prevSlide = useCallback(() => { setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1)); }, [heroSlides.length]);
  useEffect(() => { if (!heroSlides.length || isHovered) return; const timer = setInterval(() => { nextSlide(); }, 5000); return () => clearInterval(timer); }, [heroSlides.length, isHovered, nextSlide]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (new Date(p.validity) < new Date().setHours(0,0,0,0)) return false;
      
      if (activeCategory === 'volta-aulas') {
          if (!['papelaria', 'livros', 'informatica', 'tech', 'mochilas'].includes(p.category)) return false;
      } else if (activeCategory !== 'all' && activeCategory !== 'novos' && activeCategory !== 'achados') {
          if (p.category !== activeCategory) return false;
      }
      
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterStore !== 'all') {
          if (!p.store.toLowerCase().includes(filterStore.toLowerCase())) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.newPrice - b.newPrice);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.newPrice - a.newPrice);
    else if (sortBy === 'alpha') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [activeCategory, searchQuery, products, filterStore, sortBy]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) { value = `(${value.slice(0, 2)}) ${value.slice(2)}`; if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`; }
    setLeadForm({ ...leadForm, phone: value }); if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault(); let errors = { email: '', phone: '' }; let isValid = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) { errors.email = 'E-mail inválido.'; isValid = false; }
    const rawPhone = leadForm.phone.replace(/\D/g, ''); if (rawPhone.length < 11 || rawPhone[2] !== '9') { errors.phone = 'Celular inválido.'; isValid = false; }
    if (!isValid) { setFormErrors(errors); return; }
    setFormStatus('sending');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwY3v9amCacI9BCr2uozFWmz86QMQjwqvDT7jXbJ6KLemmSymxByy09HidpcxFzjh-Olw/exec'; 
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadForm) })
    .then(() => { setFormStatus('success'); setFormErrors({ email: '', phone: '' }); setTimeout(() => { setFormStatus('idle'); setLeadForm({ name: '', email: '', phone: '' }); }, 4000); })
    .catch(() => { alert("Erro ao salvar."); setFormStatus('idle'); });
  };
  const handleShare = (p: Product) => { setSelectedProduct(p); setIsShareModalOpen(true); };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       <style>{`.hide-scroll::-webkit-scrollbar {display: none} .hide-scroll {-ms-overflow-style: none; scrollbar-width: none;}`}</style>

      {/* TOP STRIPE */}
      <div className="bg-secondary text-white text-[10px] py-1 px-3 flex justify-between items-center z-50 border-t border-white/10">
        <span className="font-bold">OFERTAS SELECIONADAS POR CRIS MELLO 🧡</span>
        <div className="flex gap-3"><Instagram size={12}/><Facebook size={12}/></div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
             <svg viewBox="0 0 260 50" className="w-[140px] md:w-[180px] h-[30px] md:h-[40px]" fill="none">
                 <g transform="translate(0, 5)">
                    <path d="M5 20C5 14.4772 9.47715 10 15 10H30L50 30L30 50H15C9.47715 50 5 45.5228 5 40V20Z" fill="#FF6600" transform="rotate(-15 25 30)"/>
                    <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
                    <path d="M18 28L24 34L36 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-5 25 30) translate(2, 2)"/>
                 </g>
                 <text x="60" y="36" fontFamily="Segoe UI" fontWeight="800" fontSize="32" fill="#0A192F" letterSpacing="-0.5">PohOfertas</text>
             </svg>
          </div>
          <div className="relative w-full">
            <input className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-1 focus:ring-primary outline-none transition" 
                   placeholder="Busque por produto, marca ou categoria..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        <nav className="w-full overflow-x-auto hide-scroll bg-white pb-2 pl-4">
          <div className="flex gap-2 min-w-max pr-4">
            {LOCAL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id; const isSpecial = cat.id === 'volta-aulas';
              return ( <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1 ${isActive ? (isSpecial ? 'bg-yellow-400 text-black border-yellow-500 shadow-md' : 'bg-secondary text-white border-secondary') : (isSpecial ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50')}`}>{cat.label}</button> );
            })}
          </div>
        </nav>
      </header>

      {/* --- SESSÃO DE CAPTURA DE LEAD (TOPO) --- */}
      <section className="bg-secondary text-white py-8 px-4 relative overflow-hidden shadow-2xl z-30">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-white/20">
                    <Sparkles size={12} className="text-yellow-400 animate-pulse"/> CLUBE POH VIP
                </div>
                <h2 className="text-2xl md:text-4xl font-black mb-3 leading-tight">
                    Ofertas Secretas <br/><span className="text-primary">no seu Zap 📲</span>
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-0">
                    Não perca tempo procurando. Eu garimpo os melhores preços e te aviso. <br/><b>Cadastre-se para entrar na lista VIP.</b>
                </p>
            </div>

            <div className="w-full md:w-1/2 bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
                {formStatus === 'success' ? (
                    <div className="h-full flex flex-col justify-center items-center py-8 text-green-200 animate-in fade-in zoom-in">
                        <CheckCircle size={48} className="mb-4 text-green-400"/>
                        <span className="font-bold text-xl">Cadastro Realizado!</span>
                        <span className="text-sm text-center mt-2">Vou te adicionar em breve. Fique de olho no Zap!</span>
                    </div>
                ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                        <input type="text" placeholder="Seu Nome" required value={leadForm.name} onChange={e=>setLeadForm({...leadForm, name: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-primary focus:bg-black/60 outline-none transition placeholder-gray-500"/>
                        <input type="tel" placeholder="Seu WhatsApp (com DDD)" required value={leadForm.phone} onChange={handlePhoneChange} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-primary focus:bg-black/60 outline-none transition placeholder-gray-500"/>
                        
                        <button type="submit" disabled={formStatus==='sending'} className="w-full bg-primary py-3.5 rounded-lg font-bold text-sm hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-900/20 transition flex justify-center items-center gap-2 mt-2 transform active:scale-95">
                            {formStatus==='sending' ? <RefreshCw className="animate-spin"/> : <>QUERO ENTRAR NA LISTA VIP <ArrowRight size={16}/></>}
                        </button>
                        <div className="text-[10px] text-gray-500 text-center flex justify-center gap-1 mt-2"><ShieldCheck size={10}/> Zero spam. Apenas ofertas reais.</div>
                    </form>
                )}
            </div>
         </div>
      </section>

      {/* CARROSSEL */}
      {heroSlides.length > 0 && (
        <section className="relative w-full h-[180px] md:h-[300px] overflow-hidden bg-gray-200 group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {heroSlides.map((slide, index) => {
            const isFullBanner = slide.isFullBanner;
            return (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.color}`}>
              {isFullBanner && (
                <>
                  <img src={slide.img} alt={slide.text} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070'; }}/>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </>
              )}
              <div className="container mx-auto h-full px-6 flex items-center justify-between relative z-20">
                <div className={`flex flex-col items-start text-white ${isFullBanner ? 'w-full md:w-[60%]' : 'w-[65%] md:w-[70%]'} z-10`}>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 backdrop-blur-md ${isFullBanner ? 'bg-primary text-white' : 'bg-black/20'}`}>
                     {index === 0 ? `✨ ${LOCAL_CATEGORIES.find(c=>c.id===activeCategory)?.label || 'DESTAQUE'}` : `TOP ${index} DO DIA`}
                   </span>
                   <h2 className="text-xl md:text-5xl font-black leading-tight line-clamp-2 mb-2 drop-shadow-lg">{slide.text}</h2>
                   <p className="text-xs md:text-xl opacity-90 mb-4 line-clamp-2 drop-shadow-md font-medium">{slide.sub}</p>
                   <a href={slide.link} target="_blank" rel="noreferrer" className="bg-white text-black font-bold py-2 px-6 rounded-full text-xs md:text-sm shadow-lg hover:scale-105 transition flex items-center gap-2">
                     VER AGORA <ArrowRight size={14} />
                   </a>
                </div>
                {!isFullBanner && (
                  <div className="w-[35%] md:w-[30%] flex justify-center h-full py-4 relative">
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full transform scale-75"></div>
                    <img src={slide.img} className="h-full w-auto object-contain drop-shadow-2xl relative z-10 transform hover:scale-110 transition duration-500" onError={(e)=>{(e.target as HTMLImageElement).src='https://cdn-icons-png.flaticon.com/512/2830/2830312.png'}}/>
                  </div>
                )}
              </div>
            </div>
          )})}
          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-20 opacity-0 group-hover:opacity-100"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition z-20 opacity-0 group-hover:opacity-100"><ChevronRight size={24} /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
             {heroSlides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all shadow-sm ${i === currentSlide ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`} />))}
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8" id="promo-list">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <Zap className="text-primary animate-pulse" size={20}/>
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                {activeCategory === 'all' ? '🔥 Ofertas Quentes' : `Melhores de ${LOCAL_CATEGORIES.find(c=>c.id===activeCategory)?.label}`}
                </h2>
            </div>
            {/* FILTROS */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scroll pb-1">
                <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Ordenar:</span>
                    <select className="text-xs font-bold text-gray-700 bg-transparent outline-none cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="relevance">Mais Relevantes</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                        <option value="alpha">A-Z</option>
                    </select>
                </div>
                <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Loja:</span>
                    <select className="text-xs font-bold text-gray-700 bg-transparent outline-none cursor-pointer" value={filterStore} onChange={(e) => setFilterStore(e.target.value)}>
                        <option value="all">Todas as Lojas</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Shopee">Shopee</option>
                    </select>
                </div>
            </div>
        </div>
        
        {loading ? <div className="text-center py-20"><RefreshCw className="animate-spin mx-auto text-primary mb-2"/><p className="text-gray-400 text-sm">Carregando ofertas...</p></div> : 
         filteredProducts.length === 0 ? <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300"><ShoppingBag className="mx-auto text-gray-300 mb-2" size={40}/><p className="text-gray-400">Nenhuma oferta encontrada.</p></div> : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition duration-300">
                {p.discount > 0 && <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br z-10 shadow-sm">{p.discount}% OFF</div>}
                <button onClick={() => handleShare(p)} className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-primary hover:bg-orange-50 transition z-10"><LinkIcon size={14}/></button>
                <div className="w-full h-48 bg-white p-6 flex items-center justify-center border-b border-gray-50 group-hover:bg-gray-50 transition">
                  <img src={p.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-500" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/150'}}/>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide bg-gray-100 px-1.5 py-0.5 rounded">{p.store}</span>
                      {p.category === 'volta-aulas' && <span className="text-[10px] text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded font-bold">ESCOLA</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mb-2 leading-tight group-hover:text-primary transition">{p.title}</h3>
                  <div className="flex flex-col mb-3">
                    {p.oldPrice > 0 && <span className="text-xs text-gray-400 line-through">R$ {p.oldPrice.toFixed(2)}</span>}
                    <span className="text-xl font-black text-gray-900">R$ {p.newPrice.toFixed(2)}</span>
                    {p.oldPrice > 0 && <span className="text-[10px] text-green-600 font-medium">Economia de R$ {(p.oldPrice - p.newPrice).toFixed(2)}</span>}
                  </div>
                  <a href={p.link} target="_blank" className="block text-center bg-gray-900 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-primary transition shadow-sm hover:shadow-lg transform active:scale-95">PEGAR PROMOÇÃO</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- SEÇÃO DE PROVA SOCIAL (NOVO) --- */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <div className="flex items-center gap-2 mb-6">
            <Quote className="text-primary" size={24}/>
            <h2 className="text-xl font-black text-gray-800 uppercase">Quem segue, economiza</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
                            {t.avatar}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">{t.name}</p>
                            <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded">{t.store}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm italic mb-4">"{t.text}"</p>
                    <div className="flex text-yellow-400 gap-0.5">
                        <Star size={14} fill="currentColor"/>
                        <Star size={14} fill="currentColor"/>
                        <Star size={14} fill="currentColor"/>
                        <Star size={14} fill="currentColor"/>
                        <Star size={14} fill="currentColor"/>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <footer className="bg-white border-t py-8 text-center">
          <p className="text-sm font-bold text-gray-800">PohOfertas &copy; 2026</p>
          <p className="text-xs text-gray-400 mt-1">Preços e estoques sujeitos a alteração sem aviso prévio.</p>
      </footer>
      
      {/* MOBILE NAV */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-pb">
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="flex flex-col items-center text-primary"><HomeIcon size={20}/><span className="text-[10px] font-medium mt-1">Início</span></button>
        <button onClick={()=>document.querySelector('input')?.focus()} className="flex flex-col items-center text-gray-400 hover:text-gray-600"><Search size={20}/><span className="text-[10px] font-medium mt-1">Buscar</span></button>
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="flex flex-col items-center text-gray-400 hover:text-green-600"><User size={20}/><span className="text-[10px] font-medium mt-1">VIP</span></button>
      </nav>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

export default App;
