import { Router } from 'express';
import AuthController from '../controller/AuthController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const authRouter = Router();

authRouter.post('/register',AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.use('/protected-route', authMiddleware, (req:any, res:any) => {
    res.json({ message: `Acesso autorizado! ID do usuário: ${req.userId}` });
  });

export {authRouter};