import { Product } from './types';

/* =========================
   CATEGORIAS OFICIAIS
   ========================= */
export const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: '🔥' },
  { id: 'achados', label: 'Achados', icon: '🎁' },
  { id: 'homem', label: 'Homem', icon: '👔' },
  { id: 'mulher', label: 'Mulher', icon: '👗' },
  { id: 'calcados', label: 'Calçados', icon: '👟' },
  { id: 'cozinha', label: 'Cozinha', icon: '🍳' },
  { id: 'tech', label: 'Tech', icon: '📱' },
  { id: 'casa', label: 'Casa', icon: '🏠' },
  { id: 'ferramentas', label: 'Ferramentas', icon: '🛠️' },
  { id: 'beleza', label: 'Beleza', icon: '💄' },
  { id: 'pets', label: 'Pets', icon: '🐶' },
  { id: 'suplementos', label: 'Suplementos', icon: '💊' },
  { id: 'livros', label: 'Livros', icon: '📚' },
  { id: 'escolar', label: 'Escolar', icon: '✏️' },
  { id: 'novos', label: 'Novos', icon: '✨' },
  { id: 'descontos', label: 'Descontos', icon: '💥' }
];

/* =========================
   PRODUTOS (BASE FUNCIONAL)
   ========================= */
export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Fone de Ouvido Bluetooth 5.4 com Cancelamento de Ruído',
    oldPrice: 299.9,
    newPrice: 209.9,
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'tech',
    validity: '2026-12-31',
    discount: 30,
    link: 'https://google.com'
  },
  {
    id: '2',
    title: 'Copo Térmico Stanley 473ml',
    oldPrice: 119.9,
    newPrice: 73.38,
    image: 'https://m.media-amazon.com/images/I/71y2xY8uR-L._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-31',
    discount: 38,
    link: 'https://google.com'
  },
  {
    id: '3',
    title: 'Jogo de Panelas Antiaderente 6 Peças',
    oldPrice: 599.9,
    newPrice: 388.55,
    image: 'https://m.media-amazon.com/images/I/81F9Qy5fYEL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'cozinha',
    validity: '2026-12-31',
    discount: 35,
    link: 'https://google.com'
  },
  {
    id: '4',
    title: 'Caderno Universitário 10 Matérias',
    oldPrice: 49.9,
    newPrice: 29.9,
    image: 'https://m.media-amazon.com/images/I/61N4pZkFZGL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'escolar',
    validity: '2026-12-31',
    discount: 40,
    link: 'https://google.com'
  }
];
