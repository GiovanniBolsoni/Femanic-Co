import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import "../../styles/carrinho.css";
import { apiRequest } from '../../services/api';
import { formatarPreco } from '../../data/produtos';
import { calcularFrete, FRETE_GRATIS_A_PARTIR_DE } from '../../data/frete';
import Header from '../Header';
import Sidebar from '../Sidebar';
import SelosConfianca from '../SelosConfianca';

const FORMAS_PAGAMENTO = [
  { valor: 'pix', label: 'Pix' },
  { valor: 'cartao', label: 'Cartão de crédito' },
  { valor: 'boleto', label: 'Boleto' },
];

const Carrinho = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeOneFromCart, removeFromCart, clearCart, chaveItem } = useCart();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    estado: "",
    cidade: "",
  });

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cupomInput, setCupomInput] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [erroCupom, setErroCupom] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');
  const [processando, setProcessando] = useState(false);

  const frete = calcularFrete(endereco.cep, subtotal);
  const desconto = cupomAplicado ? Number((subtotal * (cupomAplicado.percentual / 100)).toFixed(2)) : 0;
  const total = subtotal + (frete || 0) - desconto;

  const buscarCep = async () => {
    const cepLimpo = endereco.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      alert('Informe um CEP válido com 8 dígitos.');
      return;
    }

    try {
      setBuscandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await response.json();

      if (dados.erro) {
        alert('CEP não encontrado.');
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        rua: dados.logradouro || prev.rua,
        bairro: dados.bairro || prev.bairro,
        cidade: dados.localidade || prev.cidade,
        estado: dados.uf || prev.estado,
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Não foi possível buscar o CEP agora. Preencha o endereço manualmente.');
    } finally {
      setBuscandoCep(false);
    }
  };

  const aplicarCupom = async () => {
    if (!cupomInput.trim()) return;

    try {
      setErroCupom('');
      const resultado = await apiRequest(`/cupom/${encodeURIComponent(cupomInput.trim())}`);
      setCupomAplicado(resultado);
    } catch (error) {
      setCupomAplicado(null);
      setErroCupom(error.message);
    }
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert('Adicione produtos no carrinho para prosseguir!');
      navigate('/produtos');
      return;
    }

    const camposObrigatorios = [
      endereco.rua,
      endereco.numero,
      endereco.bairro,
      endereco.estado,
      endereco.cidade,
    ];

    if (!camposObrigatorios.every((campo) => campo.trim() !== '')) {
      alert('Preencha todos os campos obrigatórios do endereço.');
      return;
    }

    if (frete === null) {
      alert('Informe um CEP válido para calcular o frete.');
      return;
    }

    const dadosCarrinho = {
      endereco,
      produtos: cartItems.map((item) => ({
        nome: item.name,
        preco: item.price,
        quantidade: item.quantity,
        tamanho: item.tamanho,
      })),
      frete,
      cupom: cupomAplicado?.codigo || null,
      formaPagamento,
    };

    try {
      setProcessando(true);
      await apiRequest('/carrinho', {
        method: 'POST',
        body: JSON.stringify(dadosCarrinho),
      });

      alert('Pedido finalizado e salvo com sucesso!');
      clearCart();
      setEndereco({ cep: '', rua: '', numero: '', bairro: '', complemento: '', estado: '', cidade: '' });
      setCupomAplicado(null);
      setCupomInput('');
      navigate('/home');
    } catch (error) {
      console.error('Erro ao processar o pedido:', error);
      alert(error.message);
    } finally {
      setProcessando(false);
    }
  };

  return (
    <>
      <Header />

      <main className="mandatory">
        <Sidebar />

        <div className="p-6 bg-gray-100 min-h-screen content">
          <div className="botao-voltar">
            <button onClick={() => navigate("/produtos")} className="botao-voltar">← Voltar</button>
          </div>

          <h2 className="titulo-carrinho">🛒 Carrinho</h2>

          <div className="tabela-carrinho">
            <table className="tabela-produtos">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tamanho</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const chave = chaveItem(item);
                  return (
                    <tr key={chave}>
                      <td>{item.name}</td>
                      <td>{item.tamanho || '—'}</td>
                      <td>{formatarPreco(item.price)}</td>
                      <td>
                        <div className="quantity-control">
                          <button onClick={() => removeOneFromCart(chave)} className="quantity-btn" disabled={item.quantity <= 1}>−</button>
                          <span className="quantity-number">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                        </div>
                      </td>
                      <td>{formatarPreco(item.price * item.quantity)}</td>
                      <td><button onClick={() => removeFromCart(chave)} className="remove-btn">Remover</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="endereco-container">
          <div className="endereco-form">
            <h3>Endereço</h3>
            <form onSubmit={(e) => e.preventDefault()} className="form-grid">
              <div className="form-group">
                <label>CEP</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" placeholder="00000-000" value={endereco.cep} onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })} required />
                  <button type="button" onClick={buscarCep} disabled={buscandoCep}>
                    {buscandoCep ? '...' : 'Buscar'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input type="text" placeholder="Av. Nova" value={endereco.rua} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input type="text" placeholder="1550" value={endereco.numero} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <input type="text" placeholder="Santo Amaro" value={endereco.bairro} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input type="text" placeholder="Cj 2715 (opcional)" value={endereco.complemento} onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select value={endereco.estado} onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })} required>
                  <option value="" disabled hidden>Selecione o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input type="text" placeholder="São Paulo" value={endereco.cidade} onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })} required />
              </div>
            </form>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Cupom de desconto</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Ex: BEMVINDO10" value={cupomInput} onChange={(e) => setCupomInput(e.target.value)} />
                <button type="button" onClick={aplicarCupom}>Aplicar</button>
              </div>
              {cupomAplicado && <p style={{ color: 'green' }}>Cupom {cupomAplicado.codigo} aplicado: -{cupomAplicado.percentual}%</p>}
              {erroCupom && <p style={{ color: 'red' }}>{erroCupom}</p>}
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Forma de pagamento</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {FORMAS_PAGAMENTO.map((forma) => (
                  <label key={forma.valor} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <input
                      type="radio"
                      name="formaPagamento"
                      value={forma.valor}
                      checked={formaPagamento === forma.valor}
                      onChange={(e) => setFormaPagamento(e.target.value)}
                    />
                    {forma.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="total-container">
              <h3>Total no carrinho</h3>
              <div>
                <p>Subtotal: <strong>{formatarPreco(subtotal)}</strong></p>
                <p>
                  Frete: <strong>{frete === null ? 'informe o CEP' : frete === 0 ? 'Grátis' : formatarPreco(frete)}</strong>
                  {subtotal < FRETE_GRATIS_A_PARTIR_DE && (
                    <small style={{ display: 'block', color: '#666' }}>
                      Frete grátis acima de {formatarPreco(FRETE_GRATIS_A_PARTIR_DE)} (estimativa por região, não substitui cálculo real da transportadora)
                    </small>
                  )}
                </p>
                {desconto > 0 && <p>Desconto: <strong>-{formatarPreco(desconto)}</strong></p>}
                <p>Total: <strong>{formatarPreco(total)}</strong></p>
                <button onClick={handlePayment} disabled={processando}>
                  {processando ? 'PROCESSANDO...' : 'FINALIZAR PEDIDO'}
                </button>
                <SelosConfianca />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Carrinho;
