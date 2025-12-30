export interface Product {
  id: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  category: string;
  validity: string;
  discount: number;
  link: string;
  store: string;

  // 🔥 CONTROLE DO SITE (opcional)
  priority?: number; // 1 = destaque | 2 = normal | 3 = baixo
}
