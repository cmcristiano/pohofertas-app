import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CATEGORIES } from './constants';

// Componente CategoryPage (inline para simplicidade)
const CategoryPage = () => {
  const { categorySlug, subcategorySlug } = useParams();
  
  const category = CATEGORIES.find(cat => cat.slug === categorySlug);
  const subcategory = subcategorySlug 
    ? category?.subcategories?.find(sub => sub.slug === subcategorySlug)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {subcategory ? subcategory.name : category?.name}
          </h1>
          {subcategory && (
            <p className="text-xl text-gray-600">
              Ofertas incríveis em {subcategory.name} de {category?.name}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Aqui vão os produtos filtrados */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <img src="https://via.placeholder.com/300x200?text=Produto" alt="Produto" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="font-bold text-lg mb-2">Produto Exemplo</h3>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-600">R$ 49,90</span>
              <span className="ml-2 text-sm text-gray-500 line-through">R$ 99,90</span>
            </div>
            <a href="#" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block">
              Ver Oferta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente HomePage (sua página principal atual)
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      {/* Seu conteúdo atual da home aqui */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Bem-vindo ao PohOfertas
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
          As melhores ofertas e promoções com cashback!
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Rotas para categorias e subcategorias */}
        <Route path="/categoria/:categorySlug" element={<CategoryPage />} />
        <Route path="/categoria/:categorySlug/:subcategorySlug" element={<CategoryPage />} />
        {/* Rota admin se existir */}
        <Route path="/admin" element={<div>Admin Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
