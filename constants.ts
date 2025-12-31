import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Tudo', icon: '🔥' },
  { id: 'achados', label: 'Achados', icon: '🎁' },
  { id: 'homem', label: 'Homem', icon: '👕' },
  { id: 'mulher', label: 'Mulher', icon: '👗' },
  { id: 'calcados', label: 'Calçados', icon: '👟' },
  { id: 'cozinha', label: 'Cozinha', icon: '🍳' },
  { id: 'tech', label: 'Tech', icon: '📱' },
  { id: 'casa', label: 'Casa', icon: '🏠' },
  { id: 'beleza', label: 'Beleza', icon: '💄' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'livros', label: 'Livros', icon: '📚' },
  { id: 'escolar', label: 'Escolar', icon: '✏️' },
];

export const PRODUCTS: Product[] = [ 
  {
    id: '1767170589533',
    title: 'WAP Ventilador de Mesa e Parede 50cm FLOW TURBO, com Tecnologia Silenciosa e Econômica, 8 Pás e 3 Velocidades, 180W 220V',
    oldPrice: 279,
    newPrice: 164,
    image: 'https://m.media-amazon.com/images/I/8194vs7pwxL._AC_SX679_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-31',
    discount: 41,
    link: 'https://amzn.to/4pep05b'
  },
];
