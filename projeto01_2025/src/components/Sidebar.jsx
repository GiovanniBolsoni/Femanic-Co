import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { clearToken, getToken } from '../services/api';

function Sidebar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const autenticado = Boolean(getToken());

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="sidebar close">
      <div className="logo-details">
        <i className="bx bxs-shopping-bag-alt"></i>
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
            <span className="link_name">
              Carrinho {totalItems > 0 && <strong>({totalItems})</strong>}
            </span>
          </Link>
        </li>
        <li>
          <div className="iocn-link">
            <Link to="/login">
              <i className="bx bx-user"></i>
              <span className="link_name">Conta</span>
            </Link>
          </div>
          {autenticado ? (
            <ul className="sub-menu">
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                >
                  Sair
                </button>
              </li>
            </ul>
          ) : (
            <ul className="sub-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
