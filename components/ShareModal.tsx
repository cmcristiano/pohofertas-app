import React from 'react';
import { X, Facebook, MessageCircle, Twitter, Link as LinkIcon, Send } from 'lucide-react';
import { Product } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const text = `Olha essa oferta que achei no PohOfertas: ${product.title} por apenas R$ ${product.newPrice.toFixed(2)}!`;
  const url = product.link;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${text} ${url}`);
    alert('Link copiado para a área de transferência!');
  };

  const shareLinks = [
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-[#25D366]', 
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}` 
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      color: 'bg-[#0088cc]', 
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` 
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-[#1877F2]', 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` 
    },
    { 
      name: 'X / Twitter', 
      icon: Twitter, 
      color: 'bg-black', 
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` 
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden animate-slideUp">
        <div className="bg-secondary p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Compartilhar Oferta</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-2 gap-4">
          {shareLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white p-3 rounded-lg flex flex-col items-center gap-2 hover:opacity-90 transition active:scale-95`}
            >
              <link.icon size={24} />
              <span className="text-sm font-semibold">{link.name}</span>
            </a>
          ))}
          
          <button 
            onClick={handleCopy}
            className="col-span-2 bg-gray-100 text-gray-700 p-3 rounded-lg flex flex-col items-center gap-2 hover:bg-gray-200 transition active:scale-95"
          >
            <LinkIcon size={24} />
            <span className="text-sm font-semibold">Copiar Link</span>
          </button>
        </div>

        <div className="bg-gray-50 p-4 border-t text-xs text-gray-500 text-center">
          Compartilhe e ajude seus amigos a economizarem!
        </div>
      </div>
    </div>
  );
};

export default ShareModal;