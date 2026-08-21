import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/superiores.css';
import '../../styles/produtos.css';
import { PRODUTOS, formatarPreco } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function Inferiores() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const inferiores = PRODUTOS.filter((item) => item.categoria === 'inferiores');

  return (
    <>
      <Header />
      <Sidebar />

      <main className="mandatory">
        <section className="produtos-section">
          <div className="box">
            <div className="header_new">
              <h2>PEÇAS INFERIORES</h2>
            </div>

            <div className="linha1"></div>
            <div className="produtos">
              {inferiores.map((item) => (
                <Link className="item" key={item.id} to={`/produto/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} loading="lazy" />
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="produto_preco">
                    <strong>{formatarPreco(item.preco)}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Inferiores;
