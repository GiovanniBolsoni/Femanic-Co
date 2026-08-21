import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import "../../styles/carrinho.css";
import { apiRequest } from '../../services/api';
import { formatarPreco } from '../../data/produtos';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Carrinho = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeOneFromCart, removeFromCart, clearCart } = useCart();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    estado: "",
    cidade: "",
  });

  const [processando, setProcessando] = useState(false);

  const validarEndereco = (e) => {
    e.preventDefault();
    alert('Endereço preenchido. Agora você pode finalizar o pedido.');
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

    const dadosCarrinho = {
      endereco,
      produtos: cartItems.map((item) => ({
        nome: item.name,
        preco: item.price,
        quantidade: item.quantity,
      })),
    };

    try {
      setProcessando(true);
      await apiRequest('/carrinho', {
        method: 'POST',
        body: JSON.stringify(dadosCarrinho),
      });

      alert('Pedido finalizado e salvo com sucesso!');
      clearCart();
      setEndereco({
        rua: '',
        numero: '',
        bairro: '',
        complemento: '',
        estado: '',
        cidade: '',
      });
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
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatarPreco(item.price)}</td>
                    <td>
                      <div className="quantity-control">
                        <button onClick={() => removeOneFromCart(item.id)} className="quantity-btn" disabled={item.quantity <= 1}>−</button>
                        <span className="quantity-number">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                      </div>
                    </td>
                    <td>{formatarPreco(item.price * item.quantity)}</td>
                    <td><button onClick={() => removeFromCart(item.id)} className="remove-btn">Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="endereco-container">
          <div className="endereco-form">
            <h3>Endereço</h3>
            <form onSubmit={validarEndereco} className="form-grid">
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
              <div className="form-submit">
                <button type="submit">Confirmar endereço</button>
              </div>
            </form>

            <div className="total-container">
              <h3>Total no carrinho</h3>
              <div>
                <p>Subtotal: <strong>{formatarPreco(total)}</strong></p>
                <p>Total: <strong>{formatarPreco(total)}</strong></p>
                <button onClick={handlePayment} disabled={processando}>
                  {processando ? 'PROCESSANDO...' : 'FINALIZAR PEDIDO'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Carrinho;
