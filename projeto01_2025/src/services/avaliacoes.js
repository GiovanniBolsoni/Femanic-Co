import { apiRequest } from './api';

export function buscarResumoAvaliacoes() {
  return apiRequest('/avaliacoes/resumo');
}

export function buscarAvaliacoesProduto(idProduto) {
  return apiRequest(`/produto/${idProduto}/avaliacoes`);
}

export function enviarAvaliacao(idProduto, { nota, comentario }) {
  return apiRequest(`/produto/${idProduto}/avaliacoes`, {
    method: 'POST',
    body: JSON.stringify({ nota, comentario }),
  });
}
