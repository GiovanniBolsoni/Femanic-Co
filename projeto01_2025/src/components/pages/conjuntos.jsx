import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/superiores.css';
import '../../styles/produtos.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

function Conjuntos() {
  const { cartItems, addToCart } = useCart();

const location = useLocation();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [location.pathname]);

const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const conjuntos = [
    { id: 2, src: '/Imagens/rtlM.jpg', nome: 'Conjunto Moletom', preco: 'R$ 159,90' },
    { id: 5, src: '/Imagens/o7Po.jpg', nome: 'Conjunto Moletom e Shorts Preto', preco: 'R$ 119,90' },
    { id: 6, src: '/Imagens/zZa5.jpg', nome: 'Conjunto Moletom Bege', preco: 'R$ 139,90' },

  ];

  const handleAddToCart = (item) => {
    const precoNumerico = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    const produto = {
      id: item.id,
      name: item.nome,
      price: precoNumerico,
    };
    addToCart(produto);
  };

  return (
    <>
      <header>
        <h1>FEMANIC & CO.</h1>
      </header>

      <div className="sidebar close">
        <div className="logo-details">
          <i className="bx bxs-shopping-bag-alt"></i>
          <span className="logo_name">FEMANIC & CO.</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/home"><span className="link_name">Home</span></Link></li>
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
              <Link to="/login"><i className="bx bx-user"></i><span className="link_name">Conta</span></Link>
            </div>
            <ul className="sub-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
            </ul>
          </li>
        </ul>
      </div>

      <main className="mandatory">
        <section className="produtos-section">
          <div className="box">
            <div className="header_new">
              <h2>CONJUNTOS</h2>
            </div>

            <div className="linha1"></div>
            <div className="produtos">
              {conjuntos.map((item, index) => (
                <div className="item" key={index}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} />
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="produto_preco">
                    <strong>{item.preco}</strong>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                  <div className="line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape" id="contato">
        <div className="rodape-div">
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <p onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                Voltar ao topo
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="rodape-direitos">
          <p className="p-rodape">©️ 2025 Femanic&Co. • Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Conjuntos;
