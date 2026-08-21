function FiltroBar({ busca, setBusca, faixaPreco, setFaixaPreco, notaMinima, setNotaMinima, ordenacao, setOrdenacao }) {
  return (
    <div className="filtro-bar">
      <input
        type="search"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="filtro-busca"
      />

      <select value={faixaPreco} onChange={(e) => setFaixaPreco(e.target.value)}>
        <option value="todos">Qualquer preço</option>
        <option value="ate60">Até R$ 60</option>
        <option value="60a100">R$ 60 a R$ 100</option>
        <option value="100a150">R$ 100 a R$ 150</option>
        <option value="acima150">Acima de R$ 150</option>
      </select>

      <select value={notaMinima} onChange={(e) => setNotaMinima(Number(e.target.value))}>
        <option value={0}>Qualquer avaliação</option>
        <option value={4}>4 estrelas ou mais</option>
        <option value={3}>3 estrelas ou mais</option>
      </select>

      <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
        <option value="relevancia">Relevância</option>
        <option value="menorPreco">Menor preço</option>
        <option value="maiorPreco">Maior preço</option>
        <option value="melhorAvaliacao">Melhor avaliação</option>
      </select>
    </div>
  );
}

export default FiltroBar;
