import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { setupWebSocket, clients } from './websocket.ts';
import { authRouter } from './routes/authRoutes.ts';
import { notificationsRouter } from './routes/notificationsRoutes.ts';
import { userRouter } from './routes/userRoutes.ts';
import createFeedbackRouter from './routes/feedbacksRoutes.ts';
import createLikeRouter from './routes/likeRoutes.ts';
import createPostRouter from './routes/postRoutes.ts';
import createFollowRouter from './routes/followsRoutes.ts';
import { connect } from './database/mongodb.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const WEBSOCKET_PORT = process.env.PORT_WEB_SOCKET || 5002;

// Middleware de segurança

// // Limite de requisições por IP
// const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000, // 15 minutos
  //   max: 600, // Limite de 600 requisições por IP
  // });
  // app.use(limiter);
  
  
// Configuração de CORS

const corsOptions = {
origin: process.env.FRONT_END, // Permite apenas a origem do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permite envio de cookies e credenciais
  allowedHeaders: ['Content-Type', 'Authorization'], // Inclua os cabeçalhos necessário
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Configuração de Helmet com Content Security Policy (CSP) ajustado
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Permite recursos do mesmo domínio
      scriptSrc: ["'self'", process.env.FRONT_END as string], // Permite scripts do front-end
      styleSrc: ["'self'", process.env.FRONT_END as string, "'unsafe-inline'"], // Permite estilos, incluindo inline se necessário
      imgSrc: ["'self'", process.env.FRONT_END as string, 'data:'], // Permite imagens do domínio e embeds de dados
      connectSrc: ["'self'", process.env.BACK_END as string], // Permite conexões API
      frameSrc: ["'none'"], // Proíbe o carregamento de frames de outras origens
      objectSrc: ["'none'"], // Proíbe o uso de objetos externos
      upgradeInsecureRequests: [], // Se for necessário permitir HTTP para HTTPS em dev
    },
  },
}));

// Configurações adicionais
app.set('trust proxy', 1); // Necessário para ambientes com proxy reverso
app.use(express.json()); // Middleware para parse de JSON

// Middleware para lidar com preflight requests (CORS para métodos complexos)


// Conexão ao banco de dados
connect();

// Configuração do WebSocket
setupWebSocket(Number(WEBSOCKET_PORT));

// Rotas da aplicação
app.use(
  '/v1',
  createFeedbackRouter(clients),
  createPostRouter(clients),
  createFollowRouter(clients),
  createLikeRouter(clients),
  notificationsRouter,
  userRouter
);
app.use('/auth', authRouter);

// Rotas informativas
app.get('/terms', (req, res) => {
  res.json({ message: 'Termos de Serviço' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: true });
});

// Inicialização do servidor
app.listen(Number(PORT) , '0.0.0.0', () => {
  console.log(`API rodando na porta: ${PORT}`);
});
