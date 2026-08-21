import { Link } from 'react-router-dom';

function SelosConfianca() {
  return (
    <div className="selos-confianca">
      <div className="selo-item">
        <i className="bx bx-lock-alt"></i>
        <span>Compra 100% segura</span>
      </div>
      <div className="selo-item">
        <i className="bx bx-transfer-alt"></i>
        <Link to="/politica-de-trocas">Troca facilitada em até 30 dias</Link>
      </div>
      <div className="selo-item">
        <i className="bx bx-truck"></i>
        <span>Frete calculado por CEP</span>
      </div>
      <div className="selo-item">
        <i className="bx bx-support"></i>
        <a href="https://t.me/Femanic_bot" target="_blank" rel="noopener noreferrer">Suporte no Telegram</a>
      </div>
    </div>
  );
}

export default SelosConfianca;
