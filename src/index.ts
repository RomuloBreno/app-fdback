// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { setupWebSocket, clients } from './websocket.ts';
// import { authRouter } from './routes/authRoutes.ts';
// import { notificationsRouter } from './routes/notificationsRoutes.ts';
// import { userRouter } from './routes/userRoutes.ts';
// import createFeedbackRouter from './routes/feedbacksRoutes.ts';
// import createLikeRouter from './routes/likeRoutes.ts';
// import createPostRouter from './routes/postRoutes.ts';
// import createFollowRouter from './routes/followsRoutes.ts';
// import {connect} from './database/mongodb.ts';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const WEBSOCKET_PORT = process.env.PORT_WEB_SOCKET || 5002;

// const corsOptions = {
//   origin: process.env.FRONT_END,
// };
// connect();
// // Configurar WebSocket em outro arquivo
// setupWebSocket(Number(WEBSOCKET_PORT));

// // Configuração de middlewares
// app.use(cors(corsOptions));
// app.set('trust proxy', 1);
// app.use(express.json());

// // Configurar rotas
// app.use(
//   '/v1',
//   createFeedbackRouter(clients),
//   createPostRouter(clients),
//   createFollowRouter(clients),
//   createLikeRouter(clients),
//   notificationsRouter,
//   userRouter,
// );
// app.use('/auth', authRouter);

// app.get('/terms', (req:any, res: any) => {
//   return res.json({ message: "Termos de Serviço" });
// });

// app.get('/health', (req:any, res: any) => {
//   return res.status(200).json({ status: true });
// });

// // Iniciar servidor
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`API rodando na porta: ${PORT}`);
// });
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
app.use(helmet());

// Limite de requisições por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
});
app.use(limiter);

// Configuração de CORS
app.use(cors({
  origin: process.env.FRONT_END,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permite envio de cookies
}));
app.options('*', cors())

app.set('trust proxy', 1);
app.use(express.json());

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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta: ${PORT}`);
});
