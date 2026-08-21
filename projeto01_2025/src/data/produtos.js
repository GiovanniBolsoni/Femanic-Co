export const PRODUTOS = [
  { id: 1, src: '/Imagens/8Ve0.jpg', nome: 'Moletom Simples Cinza', preco: 89.90, categoria: 'superiores' },
  { id: 3, src: '/Imagens/gIk6.jpg', nome: 'Agasalho com Zíper Preto', preco: 119.90, categoria: 'superiores' },
  { id: 2, src: '/Imagens/rtlM.jpg', nome: 'Conjunto Moletom', preco: 159.90, categoria: 'conjuntos' },
  { id: 4, src: '/Imagens/uuS2.jpg', nome: 'Calça de Moletom Cinza', preco: 59.90, categoria: 'inferiores' },
  { id: 5, src: '/Imagens/o7Po.jpg', nome: 'Conjunto Moletom e Shorts Preto', preco: 119.90, categoria: 'conjuntos' },
  { id: 6, src: '/Imagens/zZa5.jpg', nome: 'Conjunto Moletom Bege', preco: 139.90, categoria: 'conjuntos' },
  { id: 7, src: '/Imagens/b95i.jpg', nome: 'Cropped Preto', preco: 39.90, categoria: 'superiores' },
  { id: 8, src: '/Imagens/mzjd.jpg', nome: 'Calça Cargo Moletom Azul', preco: 69.90, categoria: 'inferiores' },
  { id: 9, src: '/Imagens/kP1O.jpg', nome: 'Calça Moletom Bege', preco: 59.90, categoria: 'inferiores' },
];

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
