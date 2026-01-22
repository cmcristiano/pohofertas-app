import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface AvisoInfoProps {
  variant?: 'simples' | 'completo' | 'box';
}

const AvisoInfo: React.FC<AvisoInfoProps> = ({ variant = 'simples' }) => {
  if (variant === 'simples') {
    return (
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 opacity-60 hover:opacity-100 transition-opacity mt-2">
        <Info size={12} />
        <span>Transparência: Como Associado Amazon/Shopee, ganhamos com compras qualificadas.</span>
      </div>
    );
  }

  if (variant === 'box') {
    return (
      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start text-xs text-blue-800/80">
        <ShieldCheck className="shrink-0 text-blue-400" size={16} />
        <div>
          <strong className="block text-blue-900 mb-0.5">Compra Segura & Transparente</strong>
          O PohOfertas é um curador de promoções. Ao clicar e comprar, somos remunerados pelas lojas parceiras. Isso mantém nosso trabalho gratuito para você! 🧡
        </div>
      </div>
    );
  }

  return null;
};

export default AvisoInfo;
