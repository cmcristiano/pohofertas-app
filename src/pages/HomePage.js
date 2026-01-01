import React, { useEffect, useState } from "react";
import { CATEGORIES } from "../constants";

export default function HomePage() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("tudo");

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("produtos");
    if (dadosSalvos) {
      const lista = JSON.parse(dadosSalvos);
      const agora = new Date();
      const ativos = lista.filter((p) => new Date(p.validade) >= agora);
      setProdutos(ativos);
    }
  }, []);

  const produtosFiltrados =
    categoriaSelecionada === "tudo"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaSelecionada);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#FF6600] text-center">
        Bem-vindo ao PoH Ofertas!
      </h1>
      <p className="text-center mb-6">
        Aqui você encontra as melhores promoções da região.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSelecionada(cat.id)}
            className={`px-3 py-2 rounded ${
              categoriaSelecionada === cat.id
                ? "bg-[#FF6600] text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-gray-400">
          Nenhuma oferta nesta categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produtosFiltrados.map((p) => (
            <div
              key={p.id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
              {p.imagem && (
                <img
                  src={p.imagem}
                  alt={p.titulo}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#FF6600] mb-2">
                  {p.titulo}
                </h2>
                <p className="text-gray-300 mb-1">
                  {p.precoAntigo && (
                    <span className="line-through mr-2">R$ {p.precoAntigo}</span>
                  )}
                  {p.precoNovo && (
                    <span className="font-bold text-green-400">
                      R$ {p.precoNovo}
                    </span>
                  )}
                </p>
                {p.desconto && (
                  <p className="text-sm text-gray-400 mb-2">
                    Desconto: {p.desconto}%
                  </p>
                )}
                <p className="text-sm text-gray-400 mb-2">
                  Categoria: {p.categoria}
                </p>
                <p className="text-sm text-gray-400 mb-2">Loja: {p.loja}</p>
                <p className="text-sm text-gray-400 mb-4">
                  Validade: {p.validade}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#FF6600] text-white py-2 rounded hover:bg-orange-500 transition"
                >
                  Ver Oferta
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}