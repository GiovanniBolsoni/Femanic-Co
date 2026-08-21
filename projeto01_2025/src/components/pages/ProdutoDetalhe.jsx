import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/Login.css';
import '../../styles/produtos.css';
import { useCart } from '../../context/useCart';
import { PRODUTOS, TAMANHOS, formatarPreco, getProdutoPorId } from '../../data/produtos';
import { buscarAvaliacoesProduto, enviarAvaliacao } from '../../services/avaliacoes';
import { useSeo } from '../../hooks/useSeo';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import EstrelasAvaliacao from '../EstrelasAvaliacao';
import SelosConfianca from '../SelosConfianca';
import ImagemProduto from '../ImagemProduto';

function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const produto = getProdutoPorId(id);
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [zoom, setZoom] = useState(false);

  const [avaliacoes, setAvaliacoes] = useState({ media: 0, quantidade: 0, avaliacoes: [] });
  const [notaNova, setNotaNova] = useState(0);
  const [comentarioNovo, setComentarioNovo] = useState('');
  const [enviandoAvaliacao, setEnviandoAvaliacao] = useState(false);
  const [mensagemAvaliacao, setMensagemAvaliacao] = useState('');

  const carregarAvaliacoes = async () => {
    if (!produto) return;
    try {
      const dados = await buscarAvaliacoesProduto(produto.id);
      setAvaliacoes(dados);
    } catch {
      // sem avaliações disponíveis ainda; mantém o estado inicial
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTamanho('');
    setQuantidade(1);
    setNotaNova(0);
    setComentarioNovo('');
    setMensagemAvaliacao('');
    carregarAvaliacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useSeo({
    title: produto?.nome || 'Produto não encontrado',
    description: produto?.descricao,
    image: produto ? `${window.location.origin}${produto.src}` : undefined,
    structuredData: produto
      ? {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: produto.nome,
          description: produto.descricao,
          image: `${window.location.origin}${produto.src}`,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'BRL',
            price: produto.preco.toFixed(2),
            availability: 'https://schema.org/InStock',
          },
          ...(avaliacoes.quantidade > 0
            ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: avaliacoes.media.toFixed(1),
                  reviewCount: avaliacoes.quantidade,
                },
              }
            : {}),
        }
      : undefined,
  });

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

  const handleEnviarAvaliacao = async (e) => {
    e.preventDefault();

    if (notaNova < 1) {
      setMensagemAvaliacao('Escolha uma nota de 1 a 5 estrelas.');
      return;
    }

    try {
      setEnviandoAvaliacao(true);
      setMensagemAvaliacao('');
      await enviarAvaliacao(produto.id, { nota: notaNova, comentario: comentarioNovo });
      setNotaNova(0);
      setComentarioNovo('');
      setMensagemAvaliacao('Avaliação enviada. Obrigado!');
      await carregarAvaliacoes();
    } catch (error) {
      setMensagemAvaliacao(error.message);
    } finally {
      setEnviandoAvaliacao(false);
    }
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
                <ImagemProduto
                  src={produto.src}
                  alt={produto.nome}
                  width={420}
                  height={420}
                  loading="eager"
                  style={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.3s ease',
                    transform: zoom ? 'scale(1.3)' : 'scale(1)',
                    cursor: 'zoom-in',
                  }}
                />
              </div>

              <div className="produto-detalhe-info">
                <h2>{produto.nome}</h2>
                <EstrelasAvaliacao media={avaliacoes.media} quantidade={avaliacoes.quantidade} />
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

                <SelosConfianca />
              </div>
            </div>

            <div className="header_new">
              <h2>Avaliações</h2>
            </div>
            <div className="linha1"></div>

            <form onSubmit={handleEnviarAvaliacao} className="avaliacao-form">
              <p>Deixe sua avaliação:</p>
              <EstrelasAvaliacao selecionavel valor={notaNova} onSelecionar={setNotaNova} />
              <textarea
                placeholder="Conte como foi sua experiência com o produto (opcional)"
                value={comentarioNovo}
                onChange={(e) => setComentarioNovo(e.target.value)}
                maxLength={500}
                rows={3}
              />
              <button type="submit" className="btn btn-warning btn-sm" disabled={enviandoAvaliacao}>
                {enviandoAvaliacao ? 'Enviando...' : 'Enviar avaliação'}
              </button>
              {mensagemAvaliacao && <p>{mensagemAvaliacao}</p>}
            </form>

            {avaliacoes.avaliacoes.length > 0 ? (
              <ul className="lista-avaliacoes">
                {avaliacoes.avaliacoes.map((avaliacao, index) => (
                  <li key={index}>
                    <strong>{avaliacao.nomeUsuario}</strong>
                    <EstrelasAvaliacao tamanho="pequeno" media={avaliacao.nota} quantidade={null} />
                    {avaliacao.comentario && <p>{avaliacao.comentario}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Ainda não há avaliações para este produto. Seja o primeiro a avaliar!</p>
            )}

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
                        <ImagemProduto className="img_item" src={item.src} alt={item.nome} />
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
