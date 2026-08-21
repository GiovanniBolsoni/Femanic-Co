export const TAMANHOS = ['P', 'M', 'G', 'GG'];

export const PRODUTOS = [
  {
    id: 1,
    src: '/Imagens/8Ve0.jpg',
    nome: 'Moletom Simples Cinza',
    preco: 89.90,
    categoria: 'superiores',
    descricao: 'Moletom básico em algodão flanelado, corte reto e conforto para o dia a dia. Combina com qualquer look casual.',
  },
  {
    id: 3,
    src: '/Imagens/gIk6.jpg',
    nome: 'Agasalho com Zíper Preto',
    preco: 119.90,
    categoria: 'superiores',
    descricao: 'Agasalho com zíper frontal, bolsos laterais e capuz ajustável. Ideal para dias mais frios sem abrir mão do estilo.',
  },
  {
    id: 2,
    src: '/Imagens/rtlM.jpg',
    nome: 'Conjunto Moletom',
    preco: 159.90,
    categoria: 'conjuntos',
    descricao: 'Conjunto de moletom (blusa + calça) no mesmo tecido, para um visual combinando sem esforço.',
  },
  {
    id: 4,
    src: '/Imagens/uuS2.jpg',
    nome: 'Calça de Moletom Cinza',
    preco: 59.90,
    categoria: 'inferiores',
    descricao: 'Calça de moletom com elástico no cós e punhos, confortável para uso casual ou treino leve.',
  },
  {
    id: 5,
    src: '/Imagens/o7Po.jpg',
    nome: 'Conjunto Moletom e Shorts Preto',
    preco: 119.90,
    categoria: 'conjuntos',
    descricao: 'Conjunto casual de blusa de moletom e shorts preto, leve e confortável para os dias mais quentes.',
  },
  {
    id: 6,
    src: '/Imagens/zZa5.jpg',
    nome: 'Conjunto Moletom Bege',
    preco: 139.90,
    categoria: 'conjuntos',
    descricao: 'Conjunto em tom bege, versátil para compor produções despojadas ou looks mais elaborados.',
  },
  {
    id: 7,
    src: '/Imagens/b95i.jpg',
    nome: 'Cropped Preto',
    preco: 39.90,
    categoria: 'superiores',
    descricao: 'Cropped básico preto, essencial para compor do casual ao esportivo.',
  },
  {
    id: 8,
    src: '/Imagens/mzjd.jpg',
    nome: 'Calça Cargo Moletom Azul',
    preco: 69.90,
    categoria: 'inferiores',
    descricao: 'Calça cargo em moletom com bolsos utilitários, unindo conforto e estilo streetwear.',
  },
  {
    id: 9,
    src: '/Imagens/kP1O.jpg',
    nome: 'Calça Moletom Bege',
    preco: 59.90,
    categoria: 'inferiores',
    descricao: 'Calça de moletom em bege, básica e fácil de combinar com qualquer parte de cima.',
  },
];

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getProdutoPorId(id) {
  return PRODUTOS.find((produto) => produto.id === Number(id));
}
