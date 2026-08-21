const FRETE_GRATIS_A_PARTIR_DE = 200;

const FAIXAS_POR_REGIAO = {
  sudeste: 14.9,
  sul: 19.9,
  outras: 27.9,
};

function regiaoPorCep(cepLimpo) {
  const primeiroDigito = cepLimpo[0];

  if (['0', '1', '2', '3'].includes(primeiroDigito)) {
    return 'sudeste';
  }
  if (['8', '9'].includes(primeiroDigito)) {
    return 'sul';
  }
  return 'outras';
}

export function calcularFrete(cep, subtotal) {
  const cepLimpo = String(cep || '').replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    return null;
  }

  if (subtotal >= FRETE_GRATIS_A_PARTIR_DE) {
    return 0;
  }

  const regiao = regiaoPorCep(cepLimpo);
  return FAIXAS_POR_REGIAO[regiao];
}

export { FRETE_GRATIS_A_PARTIR_DE };
