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
  ShoppingBag
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, SLIDES } from './constants';
import { Product } from './types';
import ShareModal from './components/ShareModal';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Slider automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /**
   * 🔥 FILTRO + ORDENAÇÃO POR MAIOR DESCONTO
   * 1. Validade
   * 2. Categoria
   * 3. Busca
   * 4. MAIOR DESCONTO PRIMEIRO
   */
  const filteredProducts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return PRODUCTS
      .filter((product) => {
        // validade
        const validityDate = new Date(product.validity);
        if (validityDate < today) return false;

        // categoria
        if (activeCategory !== 'all' && product.category !== activeCategory) {
          return false;
        }

        // busca
        if (
          searchQuery &&
          !product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const da = Number(a.discount || 0);
        const db = Number(b.discount || 0);

        // itens sem desconto sempre por último
        if (da === 0 && db > 0) return 1;
        if (db === 0 && da > 0) return -1;

        return db - da; // maior desconto primeiro
      });
  }, [activeCategory, searchQuery]);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* TOPO */}
      <div className="bg-secondary text-white text-xs py-1.5 px-3 flex justify-between items-center">
        <span className="font-semibold">Site Oficial PohOfertas</span>
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/pohachadinhos/" target="_blank" rel="noreferrer"><Instagram size={14} /></a>
          <a href="https://www.facebook.com/PohAchadinhos" target="_blank" rel="noreferrer"><Facebook size={14} /></a>
          <a href="https://t.me/+hqy-4LbvlpRhZGEx" target="_blank" rel="noreferrer"><Send size={14} /></a>
          <a href="https://chat.whatsapp.com/JhFnJAuZX6MGo8wpaQ8MAU" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold">
            <Users size={14} /> Grupo VIP
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <strong className="text-xl">PohOfertas</strong>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noreferrer"
              className="bg-whatsapp text-white px-3 py-2 rounded-full font-bold text-xs flex items-center gap-1"
            >
              <Smartphone size={16} /> PEDIR OFERTA
            </a>
          </div>

          <input
            type="text"
            placeholder="O que você procura hoje?"
            className="w-full px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </nav>
      </header>

      {/* PRODUTOS */}
      <main className="container mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma oferta encontrada.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow p-3 relative">
                {product.discount > 0 && (
                  <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-br">
                    {product.discount}% OFF
                  </div>
                )}

                <button
                  onClick={() => handleShare(product)}
                  className="absolute top-2 right-2"
                >
                  <LinkIcon size={16} />
                </button>

                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-2"
                />

                <h3 className="text-xs font-medium mb-1 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-xs text-gray-400 line-through">
                  {product.oldPrice > 0 && `R$ ${product.oldPrice.toFixed(2)}`}
                </p>

                <p className="font-black text-lg">
                  R$ {product.newPrice.toFixed(2)}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-2 bg-primary text-white text-center py-2 rounded font-bold text-sm"
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
