import React, { useState } from "react";
import { CATEGORIES } from "../constants";

export default function AdminPage() {
  const [produtos, setProdutos] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    link: "",
    imagem: "",
    precoAntigo: "",
    precoNovo: "",
    desconto: "",
    categoria: "tudo",
    loja: "",
    validade: getNextSundayEnd(),
  });

  function getNextSundayEnd() {
    const now = new Date();
    const day = now.getDay();
    const diff = (7 - day) % 7;
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + diff);
    sunday.setHours(23, 59, 0, 0);
    return sunday.toISOString().split("T")[0];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "precoAntigo" || name === "precoNovo") {
      const a = parseFloat(updatedForm.precoAntigo);
      const n = parseFloat(updatedForm.precoNovo);
      if (!isNaN(a) && !isNaN(n) && a > 0 && n >= 0) {
        const desconto = ((a - n) / a) * 100;
        updatedForm.desconto = desconto.toFixed(2);
      }
    }

    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.link.trim()) {
      alert("Título e Link são obrigatórios.");
      return;
    }

    const novoProduto = { ...form, id: editId ?? produtos.length + 1 };

    if (editId !== null) {
      const atualizados = produtos.map((p) => (p.id === editId ? novoProduto : p));
      setProdutos(atualizados);
    } else {
      setProdutos([...produtos, novoProduto]);
    }

    setForm({
      titulo: "",
      link: "",
      imagem: "",
      precoAntigo: "",
      precoNovo: "",
      desconto: "",
      categoria: "tudo",
      loja: "",
      validade: getNextSundayEnd(),
    });
    setEditId(null);
    setFormVisible(false);
  };

  const handleEdit = (produto) => {
    setForm({ ...produto });
    setEditId(produto.id);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#FF6600]">Administração de Produtos</h1>

      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mb-4 px-4 py-2 bg-[#28a745] text-white rounded"
      >
        {formVisible ? "Fechar Formulário" : "Adicionar Novo Produto"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required className="p-2 border rounded" />
          <input type="url" name="link" value={form.link} onChange={handleChange} placeholder="Link" required className="p-2 border rounded" />
          <input type="url" name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da Imagem" className="p-2 border rounded" />
          <input type="number" name="precoAntigo" value={form.precoAntigo} onChange={handleChange} placeholder="Preço Antigo" className="p-2 border rounded" />
          <input type="number" name="precoNovo" value={form.precoNovo} onChange={handleChange} placeholder="Preço Novo" className="p-2 border rounded" />
          <input type="number" name="desconto" value={form.desconto} onChange={handleChange} placeholder="Desconto %" className="p-2 border rounded" />

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm text-gray-700">Categoria</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <input type="text" name="loja" value={form.loja} onChange={handleChange} placeholder="Loja" className="p-2 border rounded" />
          <input type="date" name="validade" value={form.validade} onChange={handleChange} className="p-2 border rounded" />
          <button type="submit" className="md:col-span-2 bg-[#FF6600] text-white py-2 px-4 rounded">
            {editId !== null ? "Atualizar Produto" : "Salvar Produto"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-[#FF6600] text-white">
            <tr>
              <th className="p-2">Título</th>
              <th className="p-2">Preço</th>
              <th className="p-2">Desconto</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Loja</th>
              <th className="p-2">Validade</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.titulo}</td>
                <td className="p-2">R$ {p.precoNovo}</td>
                <td className="p-2">{p.desconto}%</td>
                <td className="p-2">{p.categoria}</td>
                <td className="p-2">{p.loja}</td>
                <td className="p-2">{p.validade}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-600 text-white px-2 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-[#dc3545] text-white px-2 py-1 rounded">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}