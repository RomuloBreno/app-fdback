import { Router } from 'express';
import FollowController from '../controller/FollowController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';


const followsRouter = Router();

followsRouter.post('/follow-user/:anotherUserId/', authMiddleware,  FollowController.addFollow);
followsRouter.post('/unfollow-user/:anotherUserId', authMiddleware, FollowController.removeFollow);
followsRouter.get('/follows-qtd/:userId', authMiddleware, FollowController.getQtdFollow);
followsRouter.get('/you-follow-me/:anotherUserId/:userId', authMiddleware, FollowController.youFollowMe);
followsRouter.get('/followers/user/:userId', authMiddleware, FollowController.getFollowersByUser);
followsRouter.get('/following/user/:userId', authMiddleware, FollowController.getFollowingByUser);

export { followsRouter };