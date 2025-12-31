import React from 'react';
import { ShoppingBag, LinkIcon, Clock, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onShare: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShare }) => {
  const getStoreColor = (store: string) => {
    const colors: Record<string, string> = {
      'Amazon': 'bg-[#FF9900] text-white',
      'Shopee': 'bg-[#EE4D2D] text-white',
      'C&A': 'bg-[#E31E24] text-white',
      'Adidas': 'bg-black text-white',
    };
    return colors[store] || 'bg-gray-600 text-white';
  };

  const getDaysLeft = () => {
    const today = new Date();
    const validityDate = new Date(product.validity);
    const diffTime = validityDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft();
  const isHot = product.discount >= 40;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col overflow-hidden relative transform hover:-translate-y-2">
      
      {/* Hot Deal Badge */}
      {isHot && (
        <div className="absolute top-2 left-2 z-20 animate-pulse-slow">
          <div className="bg-red-600 text-white text-[9px] md:text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <TrendingUp size={12} />
            <span>OFERTA QUENTE</span>
          </div>
        </div>
      )}

      {/* Discount Badge */}
      <div className={`absolute ${isHot ? 'top-10' : 'top-2'} left-2 z-10`}>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs md:text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
          -{product.discount}%
        </div>
      </div>

      {/* Share Button */}
      <button 
        onClick={() => onShare(product)}
        className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm p-2.5 rounded-full text-secondary shadow-lg hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 z-10"
        aria-label="Compartilhar oferta"
      >
        <LinkIcon size={16} />
      </button>

      {/* Image Container */}
      <div className="w-full aspect-square p-4 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={product.image || 'https://via.placeholder.com/400x400?text=Sem+Imagem'} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10" 
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50">
        
        {/* Store Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className={`${getStoreColor(product.store)} text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1`}>
            <ShoppingBag size={10} />
            {product.store}
          </span>
          
          {/* Validity Timer */}
          {daysLeft <= 7 && (
            <span className="text-[9px] text-red-600 font-semibold flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg">
              <Clock size={10} />
              {daysLeft}d restantes
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 mb-3 leading-tight h-10 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto space-y-3">
          {/* Prices */}
          <div>
            {product.oldPrice > 0 && (
              <p className="text-xs text-red-500 line-through font-medium">
                De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-secondary font-semibold">Por</span>
              <span className="text-2xl md:text-3xl font-black text-primary bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                R$ {product.newPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-gradient-to-r from-primary to-orange-600 text-white font-black py-3 rounded-xl text-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wide"
          >
            🔥 Ver Oferta Agora
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
