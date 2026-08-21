import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/Login.css';
import '../../styles/produtos.css';
import { useCart } from '../../context/useCart';
import { PRODUTOS, formatarPreco } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function Produtos() {
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
              <h2>PRODUTOS</h2>
            </div>

            <div className="linha1"></div>
            <div className="produtos">
              {PRODUTOS.map((item) => (
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
                    <div className="line"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Produtos;
