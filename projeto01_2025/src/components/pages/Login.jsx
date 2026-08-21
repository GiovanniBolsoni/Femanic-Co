import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import { apiRequest } from '../../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });

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

      localStorage.setItem('usuarioId', result.id);
      navigate('/home');
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <header>
        <h1>FEMANIC & CO.</h1>
      </header>

      <main className="mandatory">
        <div className="sidebar close">
          <div className="logo-details">
            <i className='bx bxs-shopping-bag-alt'></i>
            <span className="logo_name">FEMANIC & CO.</span>
          </div>

          <ul className="nav-links">
            <li><Link to="/home"><span className="link_name">Home</span></Link></li>
            <li>
              <div className="iocn-link">
                <Link to="/produtos"><i className="bx bx-collection"></i><span className="link_name">Produtos</span></Link>
              </div>
              <ul className="sub-menu">
                <li><Link to="/conjuntos">Conjuntos</Link></li>
                <li><Link to="/superiores">Superiores</Link></li>
                <li><Link to="/inferiores">Inferiores</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/carrinho"><i className="bx bx-cart"></i><span className="link_name">Carrinho</span></Link>
            </li>
            <li>
              <div className="iocn-link">
                <Link to="/login"><i className="bx bx-user"></i><span className="link_name">Conta</span></Link>
              </div>
              <ul className="sub-menu">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
              </ul>
            </li>
          </ul>
        </div>

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
