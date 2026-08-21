import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import { apiRequest, setToken } from '../../services/api';
import { useSeo } from '../../hooks/useSeo';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });

  useSeo({
    title: 'Entrar',
    description: 'Acesse sua conta na Femanic & Co.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setToken(result.token);
      navigate('/home');
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Header />

      <main className="mandatory">
        <Sidebar />

        <form onSubmit={handleSubmit}>
          <fieldset>
            <h1>LOGIN</h1>

            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Digite sua senha"
                value={form.senha}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <div className="btn">
              <input type="submit" value="Login" />
                <div className="cadastro-redirect">
                  <span> Não tem uma conta? </span>
                <Link to="/cadastro" className="link_cadastro"> Cadastre-se </Link>
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    </>
  );
}
