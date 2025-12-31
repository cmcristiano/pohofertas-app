import { useState } from 'react';
import { Lock, LogOut, AlertCircle, Check } from 'lucide-react';

interface FormData {
  title: string;
  link: string;
  image: string;
  newPrice: string;
  oldPrice: string;
  category: string;
  store: string;
  validity: string;
}

const CATEGORIES = [
  { id: 'eletronicos', label: '📱 Eletrônicos' },
  { id: 'livros', label: '📚 Livros' },
  { id: 'moda', label: '👕 Moda' },
  { id: 'casa', label: '🏠 Casa' },
  { id: 'esportes', label: '⚽ Esportes' },
];

const STORES = ['Amazon', 'Shopee', 'C&A', 'Adidas'];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    link: '',
    image: '',
    newPrice: '',
    oldPrice: '',
    category: 'eletronicos',
    store: 'Amazon',
    validity: new Date().toISOString().split('T')[0],
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setMessage({ type: 'success', text: '✅ Autenticado com sucesso!' });
    } else {
      setMessage({ type: 'error', text: '❌ Senha incorreta' });
    }
    setPassword('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDiscount = () => {
    if (!formData.newPrice || !formData.oldPrice) return 0;
    const newPrice = parseFloat(formData.newPrice);
    const oldPrice = parseFloat(formData.oldPrice);
    if (oldPrice === 0) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
      if (!adminToken) {
        throw new Error('Admin token not configured');
      }

      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          ...formData,
          newPrice: parseFloat(formData.newPrice),
          oldPrice: parseFloat(formData.oldPrice) || 0,
          discount: calculateDiscount(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `✅ Produto adicionado! ID: ${data.productId}` });
        setFormData({
          title: '',
          link: '',
          image: '',
          newPrice: '',
          oldPrice: '',
          category: 'eletronicos',
          store: 'Amazon',
          validity: new Date().toISOString().split('T')[0],
        });
      } else {
        setMessage({ type: 'error', text: `❌ ${data.error}` });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A192F] to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FF6B00] p-4 rounded-full">
              <Lock size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-black text-center text-[#0A192F] mb-2">
            PohOfertas Admin
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Adicione novas ofertas ao seu site
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none font-semibold"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-orange-700 text-white font-black py-3 rounded-lg transition transform hover:scale-105"
            >
              Entrar
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-[#FF6B00]">📊 PohOfertas Admin</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-black text-[#0A192F] mb-6">➕ Adicionar Nova Oferta</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Título *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="ex: iPhone 15 Pro Max"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Link de Afiliado *</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://amazon.com.br/..."
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">URL da Imagem *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preço Original</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  placeholder="999.99"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preço Atual *</label>
                <input
                  type="number"
                  name="newPrice"
                  value={formData.newPrice}
                  onChange={handleInputChange}
                  placeholder="599.99"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Categoria *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Loja *</label>
                <select
                  name="store"
                  value={formData.store}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
                >
                  {STORES.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Data de Validade *</label>
              <input
                type="date"
                name="validity"
                value={formData.validity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B00] outline-none"
              />
            </div>

            {formData.oldPrice && formData.newPrice && (
              <div className="bg-blue-50 border-l-4 border-[#FF6B00] p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Desconto calculado:</strong> {calculateDiscount()}%
                </p>
              </div>
            )}

            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message.type === 'success' ? (
                  <Check size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B00] hover:bg-orange-700 disabled:bg-gray-400 text-white font-black py-3 rounded-lg transition transform hover:scale-105"
            >
              {isLoading ? '⏳ Publicando...' : '✅ Publicar Oferta'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
