import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    precoAntigo: "",
    precoNovo: "",
    desconto: "",
    categoria: "",
    loja: "",
    link: "",
    validade: "",
    imagem: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("produtos");
    if (dadosSalvos) setProdutos(JSON.parse(dadosSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const calcularDesconto = (antigo, novo) => {
    const a = parseFloat(antigo);
    const n = parseFloat(novo);
    if (!isNaN(a) && !isNaN(n) && a > 0 && n >= 0) {
      const desconto = ((a - n) / a) * 100;
      return desconto.toFixed(2);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const novoForm = { ...form, [name]: value };

    if (name === "precoAntigo" || name === "precoNovo") {
      novoForm.desconto = calcularDesconto(novoForm.precoAntigo, novoForm.precoNovo);
    }

    setForm(novoForm);
  };

  const validar = () => {
    return Object.entries(form).every(([key, val]) => key !== "desconto" ? val.trim() !== "" : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editIndex !== null) {
      const atualizados = [...produtos];
      atualizados[editIndex] = form;
      setProdutos(atualizados);
      setEditIndex(null);
    } else {
      setProdutos([...produtos, form]);
    }

    setForm({
      titulo: "",
      precoAntigo: "",
      precoNovo: "",
      desconto: "",
      categoria: "",
      loja: "",
      link: "",
      validade: "",
      imagem: "",
    });
  };

  const handleEdit = (index) => {
    setForm(produtos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const atualizados = produtos.filter((_, i) => i !== index);
    setProdutos(atualizados);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#FF6600] text-center">
        Painel Administrativo
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-6 rounded-lg shadow-lg mb-10"
      >
        {[
          ["titulo", "Título"],
          ["precoAntigo", "Preço Antigo"],
          ["precoNovo", "Preço Novo"],
          ["categoria", "Categoria"],
          ["loja", "Loja"],
          ["link", "Link"],
          ["validade", "Validade"],
          ["imagem", "URL da Imagem"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block mb-1 text-sm text-gray-300">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-sm text-gray-300">Desconto (%)</label>
          <input
            type="text"
            name="desconto"
            value={form.desconto}
            readOnly
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-[#FF6600] text-white py-2 px-4 rounded hover:bg-orange-500 transition"
        >
          {editIndex !== null ? "Atualizar Produto" : "Adicionar Produto"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-900 text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#FF6600] text-white">
              <th className="p-2">Imagem</th>
              <th className="p-2">Título</th>
              <th className="p-2">Preço Antigo</th>
              <th className="p-2">Preço Novo</th>
              <th className="p-2">Desconto</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Loja</th>
              <th className="p-2">Validade</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="p-2">
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{p.titulo}</td>
                <td className="p-2">R$ {p.precoAntigo}</td>
                <td className="p-2">R$ {p.precoNovo}</td>
                <td className="p-2">{p.desconto}%</td>
                <td className="p-2">{p.categoria}</td>
                <td className="p-2">{p.loja}</td>
                <td className="p-2">{p.validade}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}