import React, { useRef } from 'react';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface FlashDealsProps {
  products: Product[];
  onShare: (product: Product) => void;
}

const FlashDeals: React.FC<FlashDealsProps> = ({ products, onShare }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get top 5 discounts
  const topDeals = [...products]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);

  if (topDeals.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 py-6 -mx-4 px-4 mb-8 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.3),transparent_50%)] animate-pulse" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-lg animate-bounce-subtle">
              <Zap className="text-red-600" size={24} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl md:text-2xl flex items-center gap-2">
                OFERTAS RELÂMPAGO
                <span className="animate-pulse text-yellow-300">⚡</span>
              </h2>
              <p className="text-white/90 text-xs font-medium">Maiores descontos disponíveis agora!</p>
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
        >
          {topDeals.map((product) => (
            <div 
              key={product.id}
              className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-lg font-black px-4 py-2 rounded-full shadow-xl border-2 border-white">
                  -{product.discount}%
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-white p-4 flex items-center justify-center">
                <img 
                  src={product.image || 'https://via.placeholder.com/300x300?text=Sem+Imagem'} 
                  alt={product.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 leading-tight">
                  {product.title}
                </h3>

                <div className="mt-auto space-y-2">
                  {product.oldPrice > 0 && (
                    <p className="text-xs text-red-500 line-through font-medium">
                      De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-600 font-semibold">Por</span>
                    <span className="text-3xl font-black text-red-600">
                      R$ {product.newPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-gradient-to-r from-red-600 to-orange-600 text-white font-black py-3 rounded-xl text-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase"
                  >
                    🔥 Aproveitar Agora
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
