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

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const carouselProducts = useMemo(() => {
    const now = new Date();
    return PRODUCTS
      .filter(p => new Date(p.validity + 'T23:59:59') >= now && (p.discount || 0) > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, MAX_SLIDES);
  }, []);

  useEffect(() => {
    if (!carouselProducts.length) return;
    const timer = setInterval(() => {
      setCurrentSlide(p => (p + 1) % carouselProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselProducts.length]);

  const filteredProducts = useMemo(() => {
    const now = new Date();
    return PRODUCTS.filter(p => {
      if (new Date(p.validity + 'T23:59:59') < now) return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto p-4">
          <strong className="text-xl">PohOfertas</strong>
          <input
            className="w-full mt-3 border px-4 py-2 rounded-lg"
            placeholder="Buscar ofertas..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow p-3">
              <img src={p.image} className="h-40 w-full object-contain mb-2" />
              <h3 className="text-xs line-clamp-2">{p.title}</h3>
              <p className="font-black text-lg">R$ {p.newPrice.toFixed(2)}</p>
              <a
                href={p.link}
                target="_blank"
                className="block mt-2 bg-orange-600 text-white text-center py-2 rounded font-bold text-sm"
              >
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
