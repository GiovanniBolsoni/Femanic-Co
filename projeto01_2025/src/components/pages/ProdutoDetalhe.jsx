import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/Login.css';
import '../../styles/produtos.css';
import { useCart } from '../../context/useCart';
import { PRODUTOS, TAMANHOS, formatarPreco, getProdutoPorId } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const produto = getProdutoPorId(id);
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTamanho('');
    setQuantidade(1);
  }, [location.pathname]);

  if (!produto) {
    return (
      <>
        <Header />
        <Sidebar />
        <main className="mandatory">
          <section className="produtos-section">
            <div className="box">
              <h2>Produto não encontrado</h2>
              <button className="btn btn-warning btn-sm" onClick={() => navigate('/produtos')}>
                Voltar para produtos
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }

  const relacionados = PRODUTOS.filter(
    (item) => item.categoria === produto.categoria && item.id !== produto.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    if (!tamanho) {
      alert('Escolha um tamanho antes de adicionar ao carrinho.');
      return;
    }

    for (let i = 0; i < quantidade; i += 1) {
      addToCart({ id: produto.id, name: produto.nome, price: produto.preco, tamanho });
    }

    alert('Produto adicionado ao carrinho!');
  };

  return (
    <>
      <Header />
      <Sidebar />

      <main className="mandatory">
        <section className="produtos-section">
          <div className="box">
            <div className="botao-voltar">
              <button onClick={() => navigate(-1)} className="botao-voltar">← Voltar</button>
            </div>

            <div className="produto-detalhe">
              <div
                className="produto-detalhe-imagem"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                style={{ overflow: 'hidden', maxWidth: '420px' }}
              >
                <img
                  src={produto.src}
                  alt={produto.nome}
                  style={{
                    width: '100%',
                    transition: 'transform 0.3s ease',
                    transform: zoom ? 'scale(1.3)' : 'scale(1)',
                    cursor: 'zoom-in',
                  }}
                />
              </div>

              <div className="produto-detalhe-info">
                <h2>{produto.nome}</h2>
                <p className="produto-detalhe-preco"><strong>{formatarPreco(produto.preco)}</strong></p>
                <p>{produto.descricao}</p>

                <div className="produto-detalhe-tamanhos">
                  <span>Tamanho:</span>
                  <div className="tamanhos-lista">
                    {TAMANHOS.map((opcao) => (
                      <button
                        key={opcao}
                        type="button"
                        className={`btn btn-sm ${tamanho === opcao ? 'btn-warning' : 'btn-outline-secondary'}`}
                        onClick={() => setTamanho(opcao)}
                      >
                        {opcao}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="produto-detalhe-quantidade">
                  <span>Quantidade:</span>
                  <button type="button" className="quantity-btn" onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>−</button>
                  <span className="quantity-number">{quantidade}</span>
                  <button type="button" className="quantity-btn" onClick={() => setQuantidade((q) => q + 1)}>+</button>
                </div>

                <button className="btn btn-warning" onClick={handleAddToCart}>
                  Adicionar ao carrinho
                </button>
              </div>
            </div>

            {relacionados.length > 0 && (
              <>
                <div className="header_new">
                  <h2>Você também pode gostar</h2>
                </div>
                <div className="linha1"></div>
                <div className="produtos">
                  {relacionados.map((item) => (
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
              </>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default ProdutoDetalhe;
