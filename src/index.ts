import express from 'express'
import http from 'http';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoutes.ts'
import cors from 'cors';
import createfeedbackRouter from './routes/feedbacksRoutes.ts';
import { postRouter } from './routes/postRoutes.ts';
import { userRouter } from './routes/userRoute.ts';
import { followsRouter } from './routes/followsRoutes.ts';
import { likeRouter } from './routes/likeRoutes.ts';
import { verifyToken } from './utils/tokenUtil.ts';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.FRONT_END
};
// Criar servidor WebSocket
const wss = new WebSocketServer({ port: 6001 });

// Manter lista de clientes conectados
const clients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket, req: any) => {

  const urlParams = new URLSearchParams(req.url?.split('?')[1]);

  // Obtém os parâmetros da URL
  const token = urlParams.get('token')?.split(' ')[1]; // Corrigido para pegar o token corretamente
  const userId = urlParams.get('userId'); // Pega o userId da URL

  if (!token || !verifyToken(token)) {
    ws.close();
    return;
  }
  (ws as any).userId = userId; // Salva o ID do usuário no WebSocket
  console.log("new client connected")

  clients.push(ws);
  console.log(clients.length)
  clients.map((e) => {
    console.log(e.userId)
  })

  ws.on('message', (message: any) => {
    console.log(`Mensagem recebida: ${message}`);
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});


app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use('/v1', createfeedbackRouter(clients), postRouter, userRouter, followsRouter, likeRouter);
app.use('/auth', authRouter);
app.get('/terms', (req: any, res: any) => {
  return res.json({
    message: "Termos de Serviço"
  })
})
app.get('/health', (req: any, res: any) => {
  return res.status(200).json({ status: true })
})

//init 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta: ${PORT}`);
});
