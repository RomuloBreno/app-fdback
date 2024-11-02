import { Router } from 'express';
import AuthController from '../controller/AuthController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { rateLimiter } from '../middleware/RateLimit.ts';

const authRouter = Router();

authRouter.post('/register', rateLimiter, AuthController.register);
authRouter.post('/l-fdback', rateLimiter,  AuthController.login);
authRouter.use('/protected-route', rateLimiter,  authMiddleware, (req:any, res:any) => {
    res.json({ message: `Acesso autorizado! ID do usuário: ${req.userId}` });
  });

export {authRouter};