
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../components/pages/Login";
import Cadastro from "../components/pages/cadastro";
import HomePage from "../components/pages/home";
import Produtos from "../components/pages/produtos";
import Carrinho from "../components/pages/carrinho";
import Superiores from "../components/pages/superiores";
import Conjuntos from "../components/pages/conjuntos";
import Inferiores from "../components/pages/inferiores";



export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/superiores" element={<Superiores />} />
        <Route path="/conjuntos" element={<Conjuntos />} />
        <Route path="/inferiores" element={<Inferiores />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
