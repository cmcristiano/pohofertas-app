import React from 'react';

export interface Product {
  id: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  category: string; // references Category.id
  validity: string; // YYYY-MM-DD
  discount: number;
  link: string;
  store: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}