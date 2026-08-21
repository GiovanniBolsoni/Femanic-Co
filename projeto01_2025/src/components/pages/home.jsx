import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/index.css';
import { PRODUTOS } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const LANCAMENTOS = PRODUTOS.slice(0, 3);
const PECAS_DO_MES = PRODUTOS.slice(3, 6);

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Header />

      <main className="mandatory">
        <Sidebar />

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
              {LANCAMENTOS.map((item) => (
                <div className="item" key={item.id}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} loading="lazy" />
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
              {PECAS_DO_MES.map((item) => (
                <div className="item" key={item.id}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} loading="lazy" />
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

        <Footer />
      </main>
    </>
  );
}

export default HomePage;
