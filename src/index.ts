import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes/routes.ts'
import {authRouter} from './routes/authRoutes.ts'
import cors from 'cors';

dotenv.config()
const app = express();
const PORT = process.env?.PORT || 5000;
const corsOptions = {
  origin: process.env?.FRONT_END,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use('/v1', router);
app.use('/auth', authRouter);
app.get('/terms',(req:any, res:any) =>{
  return res.json({
    message:"Termos de Serviço"
  })
})
app.get('/health',(req:any, res:any) =>{
  return res.status(200).json({status:true})
})

//init 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta: ${PORT}`);
});
