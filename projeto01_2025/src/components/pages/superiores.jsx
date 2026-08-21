import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/superiores.css';
import '../../styles/produtos.css';
import { useCart } from '../../context/useCart';
import { PRODUTOS, formatarPreco } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function Superiores() {
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const superiores = PRODUTOS.filter((item) => item.categoria === 'superiores');

  const handleAddToCart = (item) => {
    addToCart({ id: item.id, name: item.nome, price: item.preco });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <main className="mandatory">
        <section className="produtos-section">
          <div className="box">
            <div className="header_new">
              <h2>PEÇAS SUPERIORES</h2>
            </div>

            <div className="linha1"></div>
            <div className="produtos">
              {superiores.map((item) => (
                <div className="item" key={item.id}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} loading="lazy" />
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="produto_preco">
                    <strong>{formatarPreco(item.preco)}</strong>
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

      <Footer />
    </>
  );
}

export default Superiores;
