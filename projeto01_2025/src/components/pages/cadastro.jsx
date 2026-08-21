import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/cadastro.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    idade: '',
    receber: false,
    termos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const result = await apiRequest('/cadastro', {
        method: 'POST',
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          idade: form.idade || 18,
          senha: form.senha,
          receber: form.receber,
          termos: form.termos
        }),
      });

      alert(result.message);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <header>
        <h1>FEMANIC & CO.</h1>
      </header>

      <main className="mandatory">
        {/* Sidebar */}
        <div className="sidebar close">
          <div className="logo-details">
            <i className='bx bxs-shopping-bag-alt'></i>
            <span className="logo_name">FEMANIC & CO.</span>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/home"><span className="link_name">Home</span></Link>
            </li>
            <li>
              <div className="iocn-link">
                <Link to="/produtos">
                  <i className="bx bx-collection"></i>
                  <span className="link_name">Produtos</span>
                </Link>
              </div>
              <ul className="sub-menu">
                <li><Link to="/conjuntos">Conjuntos</Link></li>
                <li><Link to="/superiores">Superiores</Link></li>
                <li><Link to="/inferiores">Inferiores</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/carrinho">
                <i className="bx bx-cart"></i>
                <span className="link_name">Carrinho</span>
              </Link>
            </li>
            <li>
              <div className="iocn-link">
                <Link to="/login">
                  <i className="bx bx-user"></i>
                  <span className="link_name">Conta</span>
                </Link>
              </div>
              <ul className="sub-menu">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h1>CADASTRO</h1>

            <div className="input">
              <label htmlFor="nome">Nome</label>
              <input type="text" name="nome" id="nome" placeholder="Digite seu nome" value={form.nome} onChange={handleChange} required />
            </div>

            <div className="input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Digite seu email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="input">
              <label htmlFor="idade">Idade</label>
              <input type="number" name="idade" id="idade" placeholder="Digite sua idade" value={form.idade} onChange={handleChange} required />
            </div>

            <div className="input">
              <label htmlFor="senha">Senha</label>
              <input type="password" name="senha" id="senha" placeholder="Crie uma senha" minLength="6" value={form.senha} onChange={handleChange} required />
            </div>

            <div className="input">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="Confirme sua senha" minLength="6" value={form.confirmarSenha} onChange={handleChange} required />
            </div>

            <div className="input">
              <label>
                <input type="checkbox" name="receber" checked={form.receber} onChange={handleChange} /> Desejo receber emails promocionais
              </label>
            </div>

            <div className="input">
              <label>
                <input type="checkbox" name="termos" checked={form.termos} onChange={handleChange} required /> Aceito os termos de uso
              </label>
            </div>

            <div className="btn">
              <input type="submit" value="Cadastrar" />
              <div className="login-redirect">
                <span>Já tem uma conta? </span>
                <Link to="/login" className="link_cadastro">Faça login</Link>
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
}
