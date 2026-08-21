import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/index.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

function HomePage() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

const location = useLocation();
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [location.pathname]);
  return (
    <>
      <header>
        <h1>FEMANIC & CO.</h1>
      </header>

      <main className="mandatory">
        <div className="sidebar close">
          <div className="logo-details">
            <i className="bx bxs-shopping-bag-alt"></i>
            <span className="logo_name">FEMANIC & CO.</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/home">
                <span className="link_name">Home</span>
              </Link>
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
              <ul className="sub-menu blank">
                <li><Link className="link_name" to="/carrinho">Carrinho</Link></li>
              </ul>
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


        <section className="home1" id="home1">
          <div className="title-led">
            {[...Array(5)].map((_, i) => (
              <h2 key={i}>THERE'S FEMANIC & CO.</h2>
            ))}
          </div>
        </section>

        <section className="home3" id="home3">
          <div className="box">
            <div className="header_new">
              <h2>LANÇAMENTOS</h2>
            <div className="btn_veja">
             <Link to="/produtos">
                 VEJA TUDO
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" fill="none">
                  <path d="M1 21L21 1M21 1V20.2M21 1H1.8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </Link>
              </div>
            </div>
            <div className="linha1"></div>
            <div className="produtos">
              {[
                { src: '/Imagens/8Ve0.jpg', nome: 'Moletom Simples Cinza' },
                { src: '/Imagens/gIk6.jpg', nome: 'Agasalho com Zíper Preto' },
                { src: '/Imagens/rtlM.jpg', nome: 'Conjunto Moletom' },

              ].map((item, index) => (
                <div className="item" key={index}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} />
                    <div className="card-body"></div>
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home4" id="home4">
          <div className="box">
            <div className="header_new">
              <h2>PEÇAS DO MÊS</h2>
              <div className="btn_veja">
                <Link to="/produtos">
                VEJA TUDO
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 22 22" fill="none">
                  <path d="M1 21L21 1M21 1V20.2M21 1H1.8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </Link>
              </div>
            </div>
            <div className="linha1"></div>
            <div className="produtos">
              {[
                { src: '/Imagens/uuS2.jpg', nome: 'Calça de Moletom Cinza' },
                { src: '/Imagens/o7Po.jpg', nome: 'Conjunto Moletom e Shorts Preto' },
                { src: '/Imagens/zZa5.jpg', nome: 'Conjunto Moletom Bege' }
              ].map((item, index) => (
                <div className="item" key={index}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} />
                    <div className="card-body"></div>
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <a href="https://t.me/Femanic_bot"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            textDecoration: 'none',
          }}>
          <button
            style={{
              backgroundColor: '#FFD700',
              color: 'black',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '30px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Suporte
          </button>
        </a>

      <footer className="rodape" id="contato">
        <div className="rodape-div">
          <div className="rodape-div-1">
            <div className="rodape-div-1-coluna"></div>
          </div>
          <div className="rodape-div-2">
            <div className="rodape-div-2-coluna">
              <p
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ cursor: 'pointer' }}
              >
                Voltar ao topo
              </p>
            </div>
          </div>
          <div className="rodape-div-3">
            <div className="rodape-div-3-coluna"></div>
          </div>
        </div>
        <hr />
        <div className="rodape-direitos">
          <p className="p-rodape">©️ 2025 Femanic&Co. • Todos os direitos reservados.</p>
        </div>
      </footer>
      </main>
    </>
  );
}

export default HomePage;
