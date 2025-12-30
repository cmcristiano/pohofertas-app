import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, PRODUCTS } from './constants'
import { Product } from './types'
import ShareModal from './ShareModal'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shareProduct, setShareProduct] = useState<Product | null>(null)

  // 🔥 PRODUTOS ORDENADOS POR MAIOR DESCONTO
  const sortedByDiscount = useMemo(() => {
    return [...PRODUCTS]
      .filter(p => p.discount > 0)
      .sort((a, b) => b.discount - a.discount)
  }, [])

  // 🎯 CARROSSEL = TOP DESCONTOS
  const carouselProducts = sortedByDiscount.slice(0, 5)

  // ⏱️ AUTO SLIDE
  useEffect(() => {
    if (carouselProducts.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselProducts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselProducts.length])

  // 🔍 FILTRO PRINCIPAL
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PohOfertas</h1>
          <div className="flex gap-3">
            <a
              href="https://ofertas.pohofertas.com.br"
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              🔥 Ver Ofertas
            </a>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              📲 Pedir
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <input
            type="text"
            placeholder="O que você procura hoje?"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border rounded-full px-5 py-3 outline-none"
          />
        </div>

        {/* CATEGORIES */}
        <div className="max-w-7xl mx-auto px-4 pb-4 flex gap-2 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* 🔥 CARROSSEL AUTOMÁTICO */}
      {carouselProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-6">
          <div className="bg-yellow-500 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-white">
              <span className="inline-block bg-black/20 px-3 py-1 rounded-full text-sm mb-3">
                🔥 {carouselProducts[currentSlide].discount}% OFF
              </span>
              <h2 className="text-3xl font-bold mb-3">
                {carouselProducts[currentSlide].title}
              </h2>
              <a
                href={carouselProducts[currentSlide].link}
                target="_blank"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold"
              >
                Ver Agora →
              </a>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src={carouselProducts[currentSlide].image}
                alt={carouselProducts[currentSlide].title}
                className="max-h-60 object-contain rounded-xl bg-white p-4"
              />
            </div>
          </div>
        </section>
      )}

      {/* 🛒 PRODUTOS */}
      <main className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm p-4 relative"
          >
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}

            <button
              onClick={() => setShareProduct(product)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              🔗
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain mb-4"
            />

            <h3 className="text-sm font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>

            <div className="mb-3">
              {product.oldPrice > 0 && (
                <span className="line-through text-gray-400 text-sm mr-2">
                  R$ {product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-black">
                R$ {product.newPrice.toFixed(2)}
              </span>
            </div>

            <a
              href={product.link}
              target="_blank"
              className="block text-center bg-orange-500 text-white py-2 rounded-lg font-semibold"
            >
              VER OFERTA
            </a>
          </div>
        ))}
      </main>

      {shareProduct && (
        <ShareModal
          product={shareProduct}
          onClose={() => setShareProduct(null)}
        />
      )}
    </div>
  )
}
