import express from 'express'
import dotenv from 'dotenv'
import {router} from './routes.ts'

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.get('/terms',(req:any, res:any) =>{
  return res.json({
    message:"Termos de Serviço"
  })
})
app.use('/v1', router);
app.use(express.json());
//init 
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});