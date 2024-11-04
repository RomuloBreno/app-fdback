import { Router } from 'express';
import AuthController from '../controller/AuthController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';
import { verifyToken } from '../utils/tokenUtil.ts';

const authRouter = Router();

authRouter.post('/register', rateLimiter, AuthController.register);
authRouter.post('/l-fdback', rateLimiter,  AuthController.login);
authRouter.get('/t-fdback', AuthController.decrypt);

export {authRouter};