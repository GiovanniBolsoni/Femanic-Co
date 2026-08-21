import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Defina JWT_SECRET no arquivo .env antes de iniciar o servidor.');
}

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Muitas tentativas. Tente novamente em alguns minutos.' },
});

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Sessão inválida ou expirada.' });
  }
}

// Endpoint Hello-World
app.get('/api/hello-world', (req, res) => {
  res.json({ status: 'ok', service: 'Femanic & Co. API' });
});

// cadastra novos usuários
app.post('/api/cadastro', authLimiter, async (req, res) => {
  const { nome, email, idade, senha, receber, termos } = req.body;

  if (!nome?.trim() || !email?.trim() || !idade || !senha || termos !== true) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Informe um e-mail válido' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  const idadeNumerica = Number(idade);
  if (!Number.isInteger(idadeNumerica) || idadeNumerica < 13 || idadeNumerica > 120) {
    return res.status(400).json({ message: 'Informe uma idade válida (entre 13 e 120 anos)' });
  }

  try {
    const emailNormalizado = email.trim().toLowerCase();
    const [rows] = await pool.query('SELECT ID FROM usuario WHERE EMAIL = ?', [emailNormalizado]);
    if (rows.length > 0) {
      return res.status(409).json({ message: 'Usuário já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO usuario (NOME, EMAIL, IDADE, SENHA, RECEBER, TERMOS) VALUES (?, ?, ?, ?, ?, ?)',
      [nome.trim(), emailNormalizado, idadeNumerica, hashedPassword, receber ? 1 : 0, termos ? 1 : 0]
    );

    res.status(201).json({ message: 'Cadastro realizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

//login
app.post('/api/login', authLimiter, async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const [rows] = await pool.query(
      'SELECT ID, NOME, SENHA FROM usuario WHERE EMAIL = ?',
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Email ou senha incorretos." });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.SENHA);

    if (!senhaValida) {
      return res.status(401).json({ message: "Email ou senha incorretos." });
    }

    const token = jwt.sign({ id: usuario.ID }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      usuario: { id: usuario.ID, nome: usuario.NOME },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});


// produtos
// busca todos os produtos
app.get('/api/produto', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produto');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

//carrinho
app.post('/api/carrinho', requireAuth, async (req, res) => {
  const { endereco, produtos } = req.body;

  if (!endereco || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ message: 'Endereço ou produtos não informados.' });
  }

  const { rua, numero, bairro, complemento = '', estado, cidade } = endereco;
  if (!rua || !numero || !bairro || !estado || !cidade) {
    return res.status(400).json({ message: 'Preencha os campos obrigatórios do endereço.' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [enderecoResult] = await connection.query(
      'INSERT INTO enderecos (RUA, NUMERO, BAIRRO, COMPLEMENTO, ESTADO, CIDADE) VALUES (?, ?, ?, ?, ?, ?)',
      [rua, numero, bairro, complemento, estado, cidade]
    );

    const [pedidoResult] = await connection.query(
      'INSERT INTO pedido (ID_USUARIO, ID_ENDERECO) VALUES (?, ?)',
      [req.userId, enderecoResult.insertId]
    );
    const idPedido = pedidoResult.insertId;

    for (const item of produtos) {
      if (!item.nome || Number(item.preco) <= 0 || Number(item.quantidade) <= 0) {
        throw new Error('Produto inválido no carrinho.');
      }
      await connection.query(
        'INSERT INTO carrinhoprod (ID_PEDIDO, PRODUTO, PRECO, QUANTIDADE) VALUES (?, ?, ?, ?)',
        [idPedido, item.nome, Number(item.preco), Number(item.quantidade)]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Pedido salvo com sucesso.', idPedido });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao salvar carrinho:', error);
    res.status(500).json({ message: 'Não foi possível salvar o pedido.' });
  } finally {
    connection.release();
  }
});


app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
