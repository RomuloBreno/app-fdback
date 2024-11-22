import express from 'express'
import dotenv from 'dotenv'
import {authRouter} from './routes/authRoutes.ts'
import cors from 'cors';
import { feedbackRouter } from './routes/feedbacksRoutes.ts';
import { postRouter } from './routes/postRoutes.ts';
import { userRouter } from './routes/userRoute.ts';
import { followsRouter } from './routes/followsRoutes.ts';
import { likeRouter } from './routes/likeRoutes.ts';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.FRONT_END
};

app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use('/v1', feedbackRouter, postRouter, userRouter, followsRouter, likeRouter);
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
