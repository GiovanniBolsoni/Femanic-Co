import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../styles/Login.css';
import '../../styles/produtos.css';
import Header from '../Header';
import Footer from '../Footer';

function PoliticaTrocas() {
  return (
    <>
      <Header />

      <main className="mandatory">
        <section className="produtos-section" style={{ width: '100%' }}>
          <div className="box politica-conteudo" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="header_new">
              <h2>Política de Trocas e Devoluções</h2>
            </div>
            <div className="linha1"></div>

            <h3>Direito de arrependimento (7 dias)</h3>
            <p>
              Conforme o Art. 49 do Código de Defesa do Consumidor, você pode desistir da compra em até
              7 dias corridos após o recebimento do produto, sem precisar justificar o motivo. Nesse caso,
              o valor pago (incluindo o frete) é reembolsado integralmente.
            </p>

            <h3>Troca por defeito (até 30 dias)</h3>
            <p>
              Se o produto apresentar algum defeito de fabricação, você tem até 30 dias corridos a partir
              do recebimento para solicitar troca ou reembolso, conforme o Art. 26 do CDC. Nesses casos, o
              frete de devolução é por nossa conta.
            </p>

            <h3>Troca por tamanho ou cor (até 30 dias)</h3>
            <p>
              Se o produto não servir ou você preferir outro tamanho/cor, aceitamos a troca em até 30 dias
              corridos, desde que o produto esteja sem uso, com a etiqueta original e na embalagem. Nesse
              caso o frete de devolução fica por conta do cliente, salvo quando o erro foi nosso (produto
              errado ou incompleto).
            </p>

            <h3>Como solicitar</h3>
            <p>
              Entre em contato pelo nosso bot de atendimento no{' '}
              <a href="https://t.me/Femanic_bot" target="_blank" rel="noopener noreferrer">Telegram</a>{' '}
              informando o número do pedido e o motivo da troca/devolução. Você receberá as instruções de
              envio e o prazo estimado de reembolso (até 10 dias úteis após recebermos o produto de volta).
            </p>

            <h3>Itens não elegíveis</h3>
            <p>
              Produtos com sinais de uso, sem etiqueta ou danificados por mau uso não são elegíveis para
              troca por tamanho/cor (mera insatisfação), sem prejuízo do direito de arrependimento e da
              garantia legal contra defeitos.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default PoliticaTrocas;
