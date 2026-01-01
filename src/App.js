import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const agora = new Date();
      const filtrados = products.filter((p) => {
        const validade = new Date(p.validade);
        return validade >= agora;
      });
      setProducts(filtrados);
    }, 60000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;