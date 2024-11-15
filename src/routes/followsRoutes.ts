import { Router } from 'express';
import FollowController from '../controller/FollowController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';


const followsRouter = Router();

followsRouter.post('/follow-user/:userId/', authMiddleware,  FollowController.addFollow);
followsRouter.post('/unfollow-user/:userId', authMiddleware, FollowController.removeFollow);
followsRouter.get('/follows-qtd/userId', authMiddleware, FollowController.getQtdFollow);

export { followsRouter };