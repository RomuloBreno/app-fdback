import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { setupWebSocket, clients } from './websocket.ts';
import { authRouter } from './routes/authRoutes.ts';
import { notificationsRouter } from './routes/notificationsRoutes.ts';
import { userRouter } from './routes/userRoutes.ts';
import createFeedbackRouter from './routes/feedbacksRoutes.ts';
import createLikeRouter from './routes/likeRoutes.ts';
import createPostRouter from './routes/postRoutes.ts';
import createFollowRouter from './routes/followsRoutes.ts';
import {connect} from './database/mongodb.ts';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const WEBSOCKET_PORT = process.env.PORT_WEB_SOCKET || 5002;

const corsOptions = {
  origin: process.env.FRONT_END,
};
connect();
// Configurar WebSocket em outro arquivo
setupWebSocket(Number(WEBSOCKET_PORT));

// Configuração de middlewares
app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());

// Configurar rotas
app.use(
  '/v1',
  createFeedbackRouter(clients),
  createPostRouter(clients),
  createFollowRouter(clients),
  createLikeRouter(clients),
  notificationsRouter,
  userRouter,
);
app.use('/auth', authRouter);

app.get('/terms', (req:any, res: any) => {
  return res.json({ message: "Termos de Serviço" });
});

app.get('/health', (req:any, res: any) => {
  return res.status(200).json({ status: true });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta: ${PORT}`);
});
