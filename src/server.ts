import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes/routes.ts'
import {authRouter} from './routes/authRoutes.ts'
import cors from 'cors';

dotenv.config()
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.get('/terms',(req:any, res:any) =>{
  return res.json({
    message:"Termos de Serviço"
  })
})
app.use(express.json());
app.use('/v1', router);
app.use('/auth', authRouter);

//init 
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});