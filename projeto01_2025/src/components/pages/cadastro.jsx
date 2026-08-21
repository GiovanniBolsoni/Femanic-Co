import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/cadastro.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import { apiRequest } from '../../services/api';
import Header from '../Header';
import Sidebar from '../Sidebar';

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
      <Header />

      <main className="mandatory">
        <Sidebar />

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
