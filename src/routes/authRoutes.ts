import { Router } from 'express';
import AuthController from '../controller/AuthController.ts';
import { rateLimiter } from '../middleware/RateLimit.ts';


const authRouter = Router();

authRouter.post('/register', rateLimiter, AuthController.register);
authRouter.post('/l-fdback', AuthController.login);
authRouter.get('/t-fdback', rateLimiter,AuthController.decrypt);

export {authRouter};