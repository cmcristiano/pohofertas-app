import { Category, Product } from './types';

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

export const PRODUCTS: Product[] = [
  {
    id: '7',
    title: 'Kit 3 Camisetas Básicas Masculinas Sandrini Preto ou Sortido Algodão Premium Conforto Casual Dia a Dia',
    oldPrice: 59.90,
    newPrice: 46.99,
    image: 'https://m.media-amazon.com/images/I/5117jl8qCIL._AC_SX569_.jpg',
    category: 'homem',
    validity: '2025-12-31',
    discount: 22,
    link: 'https://amzn.to/3YHNUPO',
    store: 'Amazon'
  },
    {
    id: '1766792182886',
    title: 'Caneca Café com deus pai Junior Rostirola Branca Porções diarias de paz Minimalista Novo 2024-325ml',
    oldPrice: 29.9,
    newPrice: 20.01,
    image: 'https://m.media-amazon.com/images/I/718D6KgjjpL._AC_SX679_.jpg',
    category: 'cozinha',
    validity: '2026-12-26',
    discount: 33,
    link: 'https://amzn.to/4aA7BAu',
    store: 'Amazon'
  },
    {
    id: '1766792711767',
    title: 'Borracha Branca, Faber-Castell, Dust Free, SM/187137, 2 Unidades',
    oldPrice: 0,
    newPrice: 8.4,
    image: 'https://m.media-amazon.com/images/I/51V9B2NZPiL._AC_SX522_.jpg',
    category: 'escolar',
    validity: '2026-12-26',
    discount: 0,
    link: 'https://amzn.to/3L9ppbc',
    store: 'Amazon'
  },
  {
    id: '1766792774684',
    title: 'Caneta Fine Pen, Faber-Castell, SM/FPBPRZF, Preta',
    oldPrice: 11.8,
    newPrice: 6.8,
    image: 'https://m.media-amazon.com/images/I/51EBJqM+F9L._AC_SX522_.jpg',
    category: 'escolar',
    validity: '2026-12-26',
    discount: 42,
    link: 'https://amzn.to/4qMtq4H',
    store: 'Amazon'
  },
  {
    id: '1766792816809',
    title: 'Borracha Branca Pequena com Capa Plástica, Faber-Castell, FC Max, SM/107024, 2 Unidades',
    oldPrice: 0,
    newPrice: 9.7,
    image: 'https://m.media-amazon.com/images/I/51G5-RV42HL._AC_SY355_.jpg',
    category: 'escolar',
    validity: '2026-12-26',
    discount: 0,
    link: 'https://amzn.to/4jiOahM',
    store: 'Amazon'
  },
  {
    id: '1766792995552',
    title: 'Mulheres com Deus - 365 Dias de Fé - Devocional 2026',
    oldPrice: 39.9,
    newPrice: 29.9,
    image: 'https://m.media-amazon.com/images/I/71zHd+I7wAL._SY342_.jpg',
    category: 'livros',
    validity: '2026-12-26',
    discount: 25,
    link: 'https://amzn.to/4jciScg',
    store: 'Amazon'
  },
  {
    id: '1766793082827',
    title: 'Ar Condicionado Portátil Hisense com Wi-Fi 12.000 BTUs Frio Evaporação Automática AP-12CWBRNPS01 – 127V',
    oldPrice: 3099,
    newPrice: 1787.78,
    image: 'https://m.media-amazon.com/images/I/31g-vHrAP6L._AC_SX342_.jpg',
    category: 'livros',
    validity: '2025-12-27',
    discount: 42,
    link: 'https://amzn.to/4qnsoLZ',
    store: 'Amazon'
  },
  {
    id: '1766793133562',
    title: 'Garrafa térmica Quick Flip Stanley|710ml',
    oldPrice: 269,
    newPrice: 147,
    image: 'https://m.media-amazon.com/images/I/51MH8faVvyL._AC_SX466_.jpg',
    category: 'cozinha',
    validity: '2025-12-27',
    discount: 45,
    link: 'https://amzn.to/3L9bq5d',
    store: 'Amazon'
  },
    {
    id: '1766829802450',
    title: 'Fone de Ouvido Bluetooth 5.4 com Cancelamento de Ruído Adaptativo, Graves Poderosos',
    oldPrice: 369,
    newPrice: 209.9,
    image: 'https://m.media-amazon.com/images/I/51dIzxMhd8L._AC_SX679_.jpg',
    store: 'Amazon',
    category: 'tech',
    validity: '2026-12-27',
    discount: 43,
    link: 'https://amzn.to/45tWfdF'
  },
   {
    id: '1766830785965',
    title: 'Smart TV Ambilight 50" 4K, 50PUG8100/78, Comando de Voz, HDR10+/Dolby Atmos, VRR/ALLM, Bluetooth',
    oldPrice: 1999,
    newPrice: 1899,
    image: 'https://m.media-amazon.com/images/I/61hTC1qv92L._AC_SX679_.jpg',
    store: 'Amazon',
    category: 'achados',
    validity: '2026-12-27',
    discount: 5,
    link: 'https://amzn.to/4jiI699'
  },
  {
    id: '1766831694099',
    title: 'vestido midi alça fina feminino de algodão com recortes',
    oldPrice: 0,
    newPrice: 239.99,
    image: 'https://cea.vtexassets.com/arquivos/ids/59291602/Foto-0.jpg?v=638978794999130000',
    store: 'C&A',
    category: 'mulher',
    validity: '2026-12-27',
    discount: 0,
    link: 'https://tidd.ly/3MN2TFH'
  },
  {
    id: '1766832030333',
    title: 'Tênis Campus 00s',
    oldPrice: 0,
    newPrice: 699,
    image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3945ab568a284371a0130e3c57d0c092_9366/Tenis_Campus_00s_Azul_IF8773_06_standard.jpg',
    store: 'Adidas',
    category: 'calcados',
    validity: '2026-12-27',
    discount: 0,
    link: 'https://www.awin1.com/cread.php?awinmid=79926&awinaffid=2678244&ued=https%3A%2F%2Fwww.adidas.com.br%2Ftenis-campus-00s%2FIF8773.html'
  },
  {
    id: '1766856388841',
    title: 'Notebook Acer Aspire 5 A515-45-R043 AMD Rayzen 5 Tela 15.6” 16 GB RAM 512 GB SSD Full HD LED IPS Windows 11 Home',
    oldPrice: 4199,
    newPrice: 2924.11,
    image: 'https://m.media-amazon.com/images/I/61lLvuwZaKL._AC_SY355_.jpg',
    store: 'Amazon',
    category: 'tech',
    validity: '2026-12-27',
    discount: 30,
    link: 'https://amzn.to/4pSNEJH'
  },
  {
    id: '1766856464858',
    title: 'Mustela Stelatopia+ Hidratante Relipidante Antiprurido 300 ml - Hidratação Imediata e Profunda para Peles Secas e Extremamente Secas Seguro Para Bebês, Crianças e Adultos - Sem Fragrância - Stelatopia',
    oldPrice: 218.46,
    newPrice: 104.4,
    image: '',
    store: 'Amazon',
    category: 'beleza',
    validity: '2026-12-27',
    discount: 52,
    link: 'https://amzn.to/3YeQQDl'
  },
  {
    id: '1766856530726',
    title: 'Brinox - Jogo de Panelas 6 Peças com Fundo de Indução Ceramic Life Botanika - Verde',
    oldPrice: 760.04,
    newPrice: 388.55,
    image: 'https://m.media-amazon.com/images/I/41ABYLUvMTL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'cozinha',
    validity: '2026-12-27',
    discount: 49,
    link: 'https://amzn.to/3La5A3w'
  },
  {
    id: '1766856579868',
    title: 'Mustela Solares Protetor Solar Infantil Loção Rosto E Corpo Fps 50+ 100 Ml',
    oldPrice: 110.8,
    newPrice: 80.5,
    image: 'https://m.media-amazon.com/images/I/51pMOGNcmeL._AC_SY355_.jpg',
    store: 'Amazon',
    category: 'beleza',
    validity: '2026-12-27',
    discount: 27,
    link: 'https://amzn.to/4azYb82'
  },
  {
    id: '1766856644258',
    title: 'Ventilador de Teto com Controle Remoto, LED 20W, Silencioso, 127-220V, Durável e Confiável – Branco',
    oldPrice: 439.99,
    newPrice: 300,
    image: 'https://m.media-amazon.com/images/I/51FhU0hpSzL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-27',
    discount: 32,
    link: 'https://amzn.to/4aFlU6R'
  },
  {
    id: '1766856717068',
    title: 'roborock Aspirador e esfregão robô Qrevo S5V, esfregão de borda FlexiArm, sucção de 12.000Pa, sistema duplo de emaranhamento zero, prevenção de obstáculos inteligente, elevação de esfregão de 10 mm',
    oldPrice: 9073.35,
    newPrice: 5660.11,
    image: 'https://m.media-amazon.com/images/I/51Br5OrimUL._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-27',
    discount: 38,
    link: 'https://amzn.to/4jjcdx2'
  },
  {
    id: '1766856782020',
    title: 'Frigideira Antiaderente 24cm Com Revestimento Cerâmico, Grantino, Cabo de Madeira, Alta Resistência E Durabilidade, Compatível com Fogão Gás, Indução, Elétrico, Cooktop',
    oldPrice: 78.9,
    newPrice: 46,
    image: 'https://m.media-amazon.com/images/I/61lwd9pJL8L._AC_SY450_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-27',
    discount: 42,
    link: 'https://amzn.to/4qmwoMO'
  },
  {
    id: '1766856839675',
    title: 'Stanley - Copo de cerveja isolado, copo empilhável Stay Chill de 473 ml, para bebidas quentes ou frias',
    oldPrice: 165,
    newPrice: 73.38,
    image: 'https://m.media-amazon.com/images/I/41Q4HoPivfL._AC_SX425_.jpg',
    store: 'Amazon',
    category: 'casa',
    validity: '2026-12-27',
    discount: 56,
    link: 'https://amzn.to/3La5Rn4'
  },


 ];

export const SLIDES = [
  { 
    id: 1, 
    color: 'bg-[#FF6600]', 
    text: 'Nike LD-1000', 
    sub: 'Estilo retrô e conforto total.', 
    img: 'https://imgnike-a.akamaihd.net/768x768/058509BPA2.jpg',
    link: '#'
  },
  { 
    id: 2, 
    color: 'bg-blue-600', 
    text: 'Ar Split Elgin', 
    sub: '9000 BTUs Inverter para o seu verão.', 
    img: 'https://m.media-amazon.com/images/I/51a6D446rNL.AC_SX522.jpg',
    link: '#'
  },
  { 
    id: 3, 
    color: 'bg-yellow-500', 
    text: 'Alicate Hidráulico', 
    sub: '47% OFF na ferramenta profissional.', 
    img: 'https://http2.mlstatic.com/D_NQ_NP_2X_946324-MLA99978123527_112025-F.webp',
    link: '#'
  },
  ];
