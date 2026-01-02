import { Category } from './types';

// LISTA DE CATEGORIAS ATUALIZADA (Baseada na Amazon + POH)
export const CATEGORIES: Category[] = [
  // Especiais POH
  { id: 'all', label: 'Tudo', icon: '🔥' },
  { id: 'novos', label: 'Novos', icon: '✨' },
  { id: 'achados', label: 'Achados', icon: '🎁' },

  // Categorias da Imagem
  { id: 'alimentos', label: 'Alimentos', icon: '🍎' },
  { id: 'automotivo', label: 'Automotivo', icon: '🚗' },
  { id: 'bebes', label: 'Bebês', icon: '👶' },
  { id: 'beleza', label: 'Beleza', icon: '💄' },
  { id: 'bolsas', label: 'Bolsas', icon: '👜' },
  { id: 'brinquedos', label: 'Brinquedos', icon: '🧸' },
  { id: 'casa', label: 'Casa', icon: '🏠' },
  { id: 'celulares', label: 'Celulares', icon: '📱' },
  { id: 'informatica', label: 'Informática', icon: '💻' },
  { id: 'cozinha', label: 'Cozinha', icon: '🍳' },
  { id: 'eletronicos', label: 'Eletrônicos', icon: '📺' },
  { id: 'esportes', label: 'Esportes', icon: '⚽' },
  { id: 'ferramentas', label: 'Ferramentas', icon: '🛠️' },
  { id: 'filmes', label: 'Filmes/Música', icon: '🎬' },
  { id: 'games', label: 'Games', icon: '🎮' },
  { id: 'livros', label: 'Livros', icon: '📚' },
  { id: 'moda', label: 'Moda/Roupas', icon: '👗' },
  { id: 'papelaria', label: 'Papelaria', icon: '🖇️' },
  { id: 'pets', label: 'Pet Shop', icon: '🐾' },
];

// BANNER ROTATIVO (Pode manter ou alterar conforme necessário)
export const SLIDES = [
  { 
    id: 1, 
    color: 'bg-[#FF6600]', 
    text: 'Ofertas Exclusivas', 
    sub: 'Confira a seleção diária do POH.', 
    img: 'https://imgnike-a.akamaihd.net/768x768/058509BPA2.jpg', 
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
