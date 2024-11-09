import { Router } from 'express';
import AuthController from '../controller/AuthController.ts';
import { rateLimiter } from '../middleware/RateLimit.ts';


const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/l-fdback', AuthController.login);
authRouter.get('/t-fdback', AuthController.decrypt);

export { authRouter };