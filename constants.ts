import { Category, Product } from './types';

/* =========================
   🔒 CATEGORIAS OFICIAIS
   ========================= */
export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Tudo', icon: '🔥' },
  { id: 'achados', label: 'Achados', icon: '🎁' },
  { id: 'homem', label: 'Homem', icon: '👕' },
  { id: 'mulher', label: 'Mulher', icon: '👗' },
  { id: 'calcados', label: 'Calçados', icon: '👟' },
  { id: 'cozinha', label: 'Cozinha', icon: '🍳' },
  { id: 'tech', label: 'Tech', icon: '📱' },
  { id: 'casa', label: 'Casa', icon: '🏠' },
  { id: 'ferramentas', label: 'Ferramentas', icon: '🛠️' },
  { id: 'beleza', label: 'Beleza', icon: '💄' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'suplementos', label: 'Suplementos', icon: '💪' },
  { id: 'livros', label: 'Livros', icon: '📚' },
  { id: 'escolar', label: 'Escolar', icon: '✏️' },
];

/* =========================
   🔒 PRODUTOS
   ⚠️ REGRA:
   category DEVE ser
   uma das acima
   ========================= */
export const PRODUCTS: Product[] = [
  // 👉 SEUS PRODUTOS AQUI
];
