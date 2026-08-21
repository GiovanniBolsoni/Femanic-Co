# Femanic & Co.

E-commerce full stack de moda desenvolvido com React, Vite, Node.js, Express e MySQL. A aplicação reúne catálogo por categorias, cadastro e autenticação de usuários, carrinho persistente e um bot de atendimento no Telegram.

> Projeto acadêmico desenvolvido na disciplina de Desenvolvimento Web e Mobile.

## Funcionalidades

- catálogo responsivo com filtros por categoria;
- carrinho com controle de quantidade e totalização;
- cadastro e login com senhas protegidas por hash;
- persistência de usuários, endereços e pedidos em MySQL;
- API REST com validação e respostas de erro padronizadas;
- bot opcional para recomendações de looks no Telegram.

## Tecnologias

**Front-end:** React 19, React Router, Vite, Bootstrap e Boxicons.  
**Back-end:** Node.js, Express, MySQL, bcryptjs e dotenv.

## Estrutura

```text
Femanic-Co/
├── projeto01_2025/
│   ├── public/            # imagens do catálogo
│   ├── src/               # aplicação React
│   └── backend/           # API, banco e bot
├── .gitignore
└── README.md
```

## Como executar

Requisitos: Node.js 20 ou superior e MySQL 8.

1. Instale o front-end:

   ```bash
   cd projeto01_2025
   npm install
   ```

2. Configure e instale o back-end:

   ```bash
   cd backend
   cp .env.example .env
   npm install
   ```

3. Crie o banco com [`backend/schema.sql`](projeto01_2025/backend/schema.sql) e preencha as credenciais no arquivo `.env`.

4. Em terminais separados, execute:

   ```bash
   # API
   cd projeto01_2025/backend
   npm run dev

   # Front-end
   cd projeto01_2025
   npm run dev
   ```

O front-end estará em `http://localhost:5173` e a API em `http://localhost:3001`.

## Qualidade e segurança

```bash
cd projeto01_2025
npm run lint
npm run build
```

Credenciais e tokens nunca devem ser versionados. Use somente os arquivos `.env.example` como modelo.

## Equipe

- Anne Camarneiro Fernandes
- Enzo Ramazzina de Almeida
- Felipe Ferreira Veiga
- Mariana da Rocha Raio
- Nicolly de Aquino Santos
- Giovanni Bolsoni Fernandes

