import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../components/pages/Login";
import Cadastro from "../components/pages/cadastro";
import HomePage from "../components/pages/home";
import Produtos from "../components/pages/produtos";
import Carrinho from "../components/pages/carrinho";
import Superiores from "../components/pages/superiores";
import Conjuntos from "../components/pages/conjuntos";
import Inferiores from "../components/pages/inferiores";
import ProdutoDetalhe from "../components/pages/ProdutoDetalhe";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/produtos" element={<PrivateRoute><Produtos /></PrivateRoute>} />
        <Route path="/produto/:id" element={<PrivateRoute><ProdutoDetalhe /></PrivateRoute>} />
        <Route path="/carrinho" element={<PrivateRoute><Carrinho /></PrivateRoute>} />
        <Route path="/superiores" element={<PrivateRoute><Superiores /></PrivateRoute>} />
        <Route path="/conjuntos" element={<PrivateRoute><Conjuntos /></PrivateRoute>} />
        <Route path="/inferiores" element={<PrivateRoute><Inferiores /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
