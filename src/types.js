export interface Product {
  id: string;
  title: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  category: string;
  store: string;
  link: string;
  validity: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface Slide {
  id: string;
  text: string;
  sub: string;
  img: string;
  link: string;
  color: string;
}
