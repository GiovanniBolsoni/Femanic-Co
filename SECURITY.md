# Segurança

## Credenciais

Nunca adicione arquivos `.env`, senhas de banco ou tokens ao Git. Use os arquivos `.env.example` como referência e mantenha os valores reais somente no ambiente de execução.

Se uma credencial for publicada por engano, remova-a do código e revogue-a imediatamente no serviço responsável. Apenas apagar o valor do commit mais recente não invalida uma credencial já exposta.

## Relato de vulnerabilidade

Para evitar exposição de dados, não abra uma issue pública com credenciais ou detalhes exploráveis. Entre em contato diretamente com os responsáveis pelo projeto.

