import { Router } from 'express';
import NotifyController from '../controller/NotifyController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';


const notifyRouter = Router();

notifyRouter.get('/notifications-qtd/:userId', authMiddleware, NotifyController.getQtdNotify);


export { notifyRouter };