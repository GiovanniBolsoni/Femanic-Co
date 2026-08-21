import { useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/superiores.css';
import '../../styles/produtos.css';
import { PRODUTOS, formatarPreco } from '../../data/produtos';
import { useResumoAvaliacoes } from '../../hooks/useResumoAvaliacoes';
import { useFiltroProdutos } from '../../hooks/useFiltroProdutos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import FiltroBar from '../FiltroBar';
import EstrelasAvaliacao from '../EstrelasAvaliacao';

function Superiores() {
  const location = useLocation();
  const baseCategoria = useMemo(() => PRODUTOS.filter((item) => item.categoria === 'superiores'), []);
  const resumoAvaliacoes = useResumoAvaliacoes();
  const filtro = useFiltroProdutos(baseCategoria, resumoAvaliacoes);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
            <FiltroBar {...filtro} />
            <div className="produtos">
              {filtro.resultado.map((item) => (
                <Link className="item" key={item.id} to={`/produto/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="produto_img">
                    <img className="img_item" src={item.src} alt={item.nome} loading="lazy" />
                  </div>
                  <div className="produto_nome">
                    <span>{item.nome}</span>
                  </div>
                  <div className="text-center">
                    <EstrelasAvaliacao
                      tamanho="pequeno"
                      media={resumoAvaliacoes[item.id]?.media || 0}
                      quantidade={resumoAvaliacoes[item.id]?.quantidade ?? 0}
                    />
                  </div>
                  <div className="produto_preco">
                    <strong>{formatarPreco(item.preco)}</strong>
                  </div>
                </Link>
              ))}
              {filtro.resultado.length === 0 && <p>Nenhum produto encontrado com esses filtros.</p>}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Superiores;
