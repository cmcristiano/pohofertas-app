import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Instagram, Facebook, Link as LinkIcon, Home, User, 
  ArrowRight, ShoppingBag, RefreshCw, Flame, Tag, Mail, 
  CheckCircle, ShieldCheck, AlertCircle, Phone, Menu 
} from 'lucide-react';
import { Product } from './types';
import ShareModal from './components/ShareModal';

// --- CONFIGURAÇÃO DAS CATEGORIAS (TEXTO APENAS) ---
// Adicionei "volta-aulas" como destaque.
const LOCAL_CATEGORIES = [
  { id: 'all', label: 'Tudo' },
  { id: 'volta-aulas', label: '✏️ Volta às Aulas' }, // Único com emoji pra destaque
  { id: 'novos', label: 'Novidades' },
  { id: 'achados', label: 'Achadinhos' },
  { id: 'papelaria', label: 'Papelaria' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'casa', label: 'Casa' },
  { id: 'beleza', label: 'Beleza' },
  { id: 'livros', label: 'Livros' },
  { id: 'moda', label: 'Moda' },
  { id: 'bebes', label: 'Infantil' },
  { id: 'games', label: 'Games' },
];

const SLIDE_COLORS = [
  'bg-gradient-to-r from-yellow-500 to-orange-500', // Cor Volta às Aulas
  'bg-gradient-to-r from-blue-600 to-indigo-700',   
  'bg-gradient-to-r from-emerald-500 to-green-700',
  'bg-gradient-to-r from-purple-600 to-pink-600', 
  'bg-gradient-to-r from-red-600 to-orange-500',    
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('volta-aulas'); // Começa na categoria da época
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Lead Form
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS
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

  // 2. CARROSSEL COM BANNER "VOLTA ÀS AULAS" FIXO
  const heroSlides = useMemo(() => {
    // Slide Especial Manual
    const specialSlide = {
        id: 'school-promo',
        color: SLIDE_COLORS[0], // Amarelo
        text: 'Volta às Aulas 2026',
        sub: 'Material Escolar com Preço de Atacado 🎒',
        img: 'https://cdn-icons-png.flaticon.com/512/167/167707.png', // Imagem Genérica de Mochila/Material
        link: 'https://amzn.to/3EXAMPLE' // Se tiver um link geral, ponha aqui, senão deixe #
    };

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const valid = products.filter(p => new Date(p.validity) >= today);
    const top4 = valid.sort((a, b) => b.discount - a.discount).slice(0, 4);
    
    // Junta o Especial + Top 4 produtos
    const generatedSlides = top4.map((p, i) => ({
        id: p.id, color: SLIDE_COLORS[(i + 1) % SLIDE_COLORS.length], 
        text: p.title, sub: `🔥 ${p.discount}% OFF | Oferta Relâmpago`, img: p.image, link: p.link
    }));

    return [specialSlide, ...generatedSlides];
  }, [products]);

  useEffect(() => {
    if (!heroSlides.length) return;
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 3. FILTRO
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (new Date(p.validity) < new Date().setHours(0,0,0,0)) return false;
      
      // Lógica Especial: Se clicar em "Volta às Aulas", mostra papelaria + livros + tech
      if (activeCategory === 'volta-aulas') {
          return ['papelaria', 'livros', 'informatica', 'tech', 'mochilas'].includes(p.category);
      }

      if (activeCategory !== 'all' && activeCategory !== 'novos' && p.category !== activeCategory && activeCategory !== 'achados') return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery, products]);

  // VALIDAÇÃO E ENVIO
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setLeadForm({ ...leadForm, phone: value });
    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let errors = { email: '', phone: '' };
    let isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) { errors.email = 'E-mail inválido.'; isValid = false; }
    const rawPhone = leadForm.phone.replace(/\D/g, ''); 
    if (rawPhone.length < 11 || rawPhone[2] !== '9') { errors.phone = 'Celular inválido (DDD + 9...).'; isValid = false; }

    if (!isValid) { setFormErrors(errors); return; }

    setFormStatus('sending');
    // SEU LINK DO GOOGLE SHEETS JÁ ESTÁ AQUI 👇
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwY3v9amCacI9BCr2uozFWmz86QMQjwqvDT7jXbJ6KLemmSymxByy09HidpcxFzjh-Olw/exec'; 

    fetch(SCRIPT_URL, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm)
    }).then(() => {
        setFormStatus('success'); setFormErrors({ email: '', phone: '' });
        setTimeout(() => { setFormStatus('idle'); setLeadForm({ name: '', email: '', phone: '' }); }, 4000);
    }).catch(() => { alert("Erro ao salvar."); setFormStatus('idle'); });
  };

  const handleShare = (p: Product) => { setSelectedProduct(p); setIsShareModalOpen(true); };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       <style>{`.hide-scroll::-webkit-scrollbar {display: none} .hide-scroll {-ms-overflow-style: none; scrollbar-width: none;}`}</style>

      {/* TOP STRIPE */}
      <div className="bg-secondary text-white text-[10px] py-1 px-3 flex justify-between items-center z-50">
        <span className="font-bold">VOLTA ÀS AULAS POH 🎒</span>
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
             <div className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">V.3.6</div>
          </div>

          <div className="relative w-full">
            <input className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-1 focus:ring-primary outline-none transition" 
                   placeholder="O que você procura hoje?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* MENU CATEGORIAS (MINIMALISTA - TEXTO APENAS) */}
        <nav className="w-full overflow-x-auto hide-scroll bg-white pb-2 pl-4">
          <div className="flex gap-2 min-w-max pr-4">
            {LOCAL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isSpecial = cat.id === 'volta-aulas';
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-bold transition-all border
                    ${isActive 
                        ? (isSpecial ? 'bg-yellow-400 text-black border-yellow-500 shadow-md' : 'bg-secondary text-white border-secondary') 
                        : (isSpecial ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50')
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* CARROSSEL */}
      {heroSlides.length > 0 && (
        <section className="relative w-full h-[180px] md:h-[300px] overflow-hidden bg-gray-200">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.color}`}>
              <div className="container mx-auto h-full px-6 flex items-center justify-between">
                <div className="flex flex-col items-start text-white w-[70%] z-10">
                   <span className="bg-black/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 backdrop-blur-md">
                     {index === 0 ? '🔔 ATENÇÃO PAIS' : `TOP ${index} DO DIA`}
                   </span>
                   <h2 className="text-lg md:text-4xl font-black leading-tight line-clamp-2 mb-1">{slide.text}</h2>
                   <p className="text-xs md:text-lg opacity-90 mb-3 line-clamp-1">{slide.sub}</p>
                   <a href={slide.link} target="_blank" rel="noreferrer" className="bg-white text-black font-bold py-1.5 px-4 rounded-full text-xs shadow-lg hover:scale-105 transition flex items-center gap-1">
                     VER AGORA <ArrowRight size={12} />
                   </a>
                </div>
                <div className="w-[30%] flex justify-center">
                   <img src={slide.img} className="h-28 md:h-56 object-contain drop-shadow-2xl" onError={(e)=>{(e.target as HTMLImageElement).src='https://cdn-icons-png.flaticon.com/512/2830/2830312.png'}}/>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* GRID */}
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          {activeCategory === 'volta-aulas' ? '🎒 Material Escolar & Tech' : '🔥 Melhores Ofertas'}
        </h2>

        {loading ? <div className="text-center py-10"><RefreshCw className="animate-spin mx-auto text-primary"/></div> : 
         filteredProducts.length === 0 ? <div className="text-center py-10 text-gray-400">Sem ofertas nesta categoria.</div> : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group">
                {p.discount > 0 && <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br z-10">{p.discount}%</div>}
                <button onClick={() => handleShare(p)} className="absolute top-1 right-1 bg-white/80 p-1.5 rounded-full text-gray-600 hover:text-primary z-10"><LinkIcon size={14}/></button>
                
                <div className="w-full h-40 bg-white p-4 flex items-center justify-center border-b border-gray-50">
                  <img src={p.image} className="max-h-full max-w-full object-contain group-hover:scale-105 transition" loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/150'}}/>
                </div>

                <div className="p-3">
                  <h3 className="text-xs font-medium text-gray-700 line-clamp-2 h-8 mb-2 leading-tight">{p.title}</h3>
                  <div className="flex items-center gap-1 mb-1"><Tag size={10} className="text-gray-400"/><span className="text-[10px] text-gray-400 uppercase">{p.store}</span></div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-400 line-through">R$ {p.oldPrice.toFixed(0)}</span>
                    <span className="text-lg font-black text-gray-900">R$ {p.newPrice.toFixed(2)}</span>
                  </div>
                  <a href={p.link} target="_blank" className="block text-center bg-primary text-white font-bold text-xs py-2 rounded mt-2 hover:bg-orange-600 transition">COMPRAR</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CLUBE VIP */}
      <section className="bg-secondary text-white py-10 mt-8 px-4">
         <div className="max-w-xl mx-auto text-center">
            <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold mb-3">CLUBE POH VIP</div>
            <h2 className="text-2xl font-black mb-2">Ofertas no seu Zap 📲</h2>
            <p className="text-sm text-gray-300 mb-6">Cadastre-se para receber a lista de material escolar com desconto.</p>
            
            {formStatus === 'success' ? (
                <div className="bg-green-500/20 p-4 rounded border border-green-500 text-green-200 flex flex-col items-center"><CheckCircle className="mb-2"/><span>Cadastrado! Fique de olho.</span></div>
            ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input type="text" placeholder="Nome" required value={leadForm.name} onChange={e=>setLeadForm({...leadForm, name: e.target.value})} className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white text-sm focus:border-primary outline-none"/>
                    <input type="email" placeholder="Email" required value={leadForm.email} onChange={e=>setLeadForm({...leadForm, email: e.target.value})} className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white text-sm focus:border-primary outline-none"/>
                    <input type="tel" placeholder="(DD) 9xxxx-xxxx" required value={leadForm.phone} onChange={handlePhoneChange} className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white text-sm focus:border-primary outline-none"/>
                    <button type="submit" disabled={formStatus==='sending'} className="w-full bg-primary py-2.5 rounded font-bold text-sm hover:bg-orange-600 transition flex justify-center gap-2">
                        {formStatus==='sending' ? <RefreshCw className="animate-spin"/> : <>ENTRAR NO GRUPO <ArrowRight size={16}/></>}
                    </button>
                    <div className="text-[10px] text-gray-500 flex justify-center gap-1"><ShieldCheck size={10}/> Dados seguros.</div>
                </form>
            )}
         </div>
      </section>

      <footer className="bg-white border-t py-6 text-center text-xs text-gray-400">
        &copy; 2026 PohOfertas. Preços sujeitos a alteração.
      </footer>

      {/* MENU MOBILE */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="flex flex-col items-center text-primary"><Home size={20}/><span className="text-[10px]">Início</span></button>
        <button onClick={()=>document.querySelector('input')?.focus()} className="flex flex-col items-center text-gray-400"><Search size={20}/><span className="text-[10px]">Buscar</span></button>
        <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" className="flex flex-col items-center text-gray-400"><User size={20}/><span className="text-[10px]">VIP</span></a>
      </nav>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} product={selectedProduct} />
    </div>
  );
};

export default App;
