import { useEffect, useState } from 'react';
import { buscarResumoAvaliacoes } from '../services/avaliacoes';

export function useResumoAvaliacoes() {
  const [resumo, setResumo] = useState({});

  useEffect(() => {
    let ativo = true;

    buscarResumoAvaliacoes()
      .then((dados) => {
        if (!ativo) return;
        const mapa = {};
        dados.forEach((item) => {
          mapa[item.idProduto] = { media: item.media, quantidade: item.quantidade };
        });
        setResumo(mapa);
      })
      .catch(() => {
        // sem avaliações disponíveis ainda (ou API fora do ar): segue sem quebrar a listagem
      });

    return () => {
      ativo = false;
    };
  }, []);

  return resumo;
}
