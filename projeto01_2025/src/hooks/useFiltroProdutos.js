import { useMemo, useState } from 'react';

const FAIXAS_PRECO = {
  todos: () => true,
  ate60: (preco) => preco <= 60,
  '60a100': (preco) => preco > 60 && preco <= 100,
  '100a150': (preco) => preco > 100 && preco <= 150,
  acima150: (preco) => preco > 150,
};

export function useFiltroProdutos(produtosBase, resumoAvaliacoes) {
  const [busca, setBusca] = useState('');
  const [faixaPreco, setFaixaPreco] = useState('todos');
  const [notaMinima, setNotaMinima] = useState(0);
  const [ordenacao, setOrdenacao] = useState('relevancia');

  const resultado = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();

    let lista = produtosBase.filter((produto) => {
      const mediaProduto = resumoAvaliacoes[produto.id]?.media || 0;
      const combinaBusca = !buscaNormalizada || produto.nome.toLowerCase().includes(buscaNormalizada);
      const combinaPreco = FAIXAS_PRECO[faixaPreco](produto.preco);
      const combinaNota = mediaProduto >= notaMinima;
      return combinaBusca && combinaPreco && combinaNota;
    });

    if (ordenacao === 'menorPreco') {
      lista = [...lista].sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === 'maiorPreco') {
      lista = [...lista].sort((a, b) => b.preco - a.preco);
    } else if (ordenacao === 'melhorAvaliacao') {
      lista = [...lista].sort(
        (a, b) => (resumoAvaliacoes[b.id]?.media || 0) - (resumoAvaliacoes[a.id]?.media || 0)
      );
    }

    return lista;
  }, [produtosBase, resumoAvaliacoes, busca, faixaPreco, notaMinima, ordenacao]);

  return {
    resultado,
    busca,
    setBusca,
    faixaPreco,
    setFaixaPreco,
    notaMinima,
    setNotaMinima,
    ordenacao,
    setOrdenacao,
  };
}
