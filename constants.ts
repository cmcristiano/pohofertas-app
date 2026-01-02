import { Category } from './types';

// LISTA DE CATEGORIAS (Fixa)
export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Tudo', icon: '🔥' },
  { id: 'novos', label: 'Novos', icon: '✨' },
  { id: 'achados', label: 'Achados', icon: '🎁' },
  { id: 'homem', label: 'Homem', icon: '👕' },
  { id: 'mulher', label: 'Mulher', icon: '👗' },
  { id: 'calcados', label: 'Calçados', icon: '👟' },
  { id: 'cozinha', label: 'Cozinha', icon: '🍳' },
  { id: 'tech', label: 'Tech', icon: '📱' },
  { id: 'casa', label: 'Casa', icon: '🔌' },
  { id: 'ferramentas', label: 'Ferram.', icon: '🛠️' },
  { id: 'beleza', label: 'Beleza', icon: '💄' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'suplementos', label: 'Suplem.', icon: '💪' },
  { id: 'livros', label: 'Livros', icon: '📚' },
  { id: 'escolar', label: 'Escolar', icon: '✏️' },
];

// BANNER ROTATIVO (Fixo)
// Se quiser mudar os banners, é só editar aqui.
export const SLIDES = [
  { 
    id: 1, 
    color: 'bg-[#FF6600]', 
    text: 'Ofertas Exclusivas', 
    sub: 'Confira a seleção diária do POH.', 
    img: 'https://imgnike-a.akamaihd.net/768x768/058509BPA2.jpg', // Imagem de exemplo
    link: '#'
  },
  { 
    id: 2, 
    color: 'bg-blue-600', 
    text: 'Tecnologia', 
    sub: 'Os gadgets mais desejados.', 
    img: 'https://m.media-amazon.com/images/I/51a6D446rNL.AC_SX522.jpg', 
    link: '#'
  },
  { 
    id: 3, 
    color: 'bg-yellow-500', 
    text: 'Casa & Cozinha', 
    sub: 'Tudo para o seu lar.', 
    img: 'https://http2.mlstatic.com/D_NQ_NP_2X_946324-MLA99978123527_112025-F.webp', 
    link: '#'
  },
];

// OBS: A lista de produtos foi removida daqui.
// Agora o App.tsx busca os produtos automaticamente do arquivo '/public/promocoes.json'.
