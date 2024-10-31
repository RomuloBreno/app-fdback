import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes/routes.ts'
import {authRouter} from './routes/authRoutes.ts'
import { authMiddleware } from './middleware/authMiddleware.ts'

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.get('/terms',(req:any, res:any) =>{
  return res.json({
    message:"Termos de Serviço"
  })
})
app.use(express.json());
app.use('/v1', router);
app.use('/auth', authRouter);
app.use('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: `Acesso autorizado! ID do usuário: ${req.userId}` });
});
//init 
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});