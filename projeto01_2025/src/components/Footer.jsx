function Footer() {
  return (
    <footer className="rodape" id="contato">
      <div className="rodape-div">
        <div className="rodape-div-1">
          <div className="rodape-div-1-coluna"></div>
        </div>
        <div className="rodape-div-2">
          <div className="rodape-div-2-coluna">
            <p
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            >
              Voltar ao topo
            </p>
          </div>
        </div>
        <div className="rodape-div-3">
          <div className="rodape-div-3-coluna"></div>
        </div>
      </div>
      <hr />
      <div className="rodape-direitos">
        <p className="p-rodape">©️ 2025 Femanic&Co. • Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
