function EstrelasAvaliacao({ media = 0, quantidade = null, tamanho = 'normal', selecionavel = false, valor = 0, onSelecionar }) {
  const estrelas = [1, 2, 3, 4, 5];
  const classeIcone = tamanho === 'pequeno' ? 'bx-xs' : 'bx-sm';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      {estrelas.map((posicao) => {
        const preenchida = selecionavel ? posicao <= valor : posicao <= Math.round(media);
        return (
          <i
            key={posicao}
            className={`bx ${preenchida ? 'bxs-star' : 'bx-star'} ${classeIcone}`}
            style={{
              color: '#ffc107',
              cursor: selecionavel ? 'pointer' : 'default',
            }}
            onClick={selecionavel ? () => onSelecionar(posicao) : undefined}
          />
        );
      })}
      {!selecionavel && quantidade !== null && (
        <small style={{ color: '#666' }}>
          {quantidade > 0 ? `${media.toFixed(1)} (${quantidade})` : 'Sem avaliações'}
        </small>
      )}
    </span>
  );
}

export default EstrelasAvaliacao;
