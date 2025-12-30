export type Category = {
  id: string;
  label: string;
  icon: string;
};

export type Product = {
  id: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  store: string;
  category: string;
  validity: string;
  discount: number;
  link: string;
};
