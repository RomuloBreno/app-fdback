import { Router } from 'express';
import LikeController from '../controller/LikeController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';


const likeRouter = Router();

likeRouter.post('/publish-like/:postId', authMiddleware, LikeController.toggleLike);
likeRouter.get('/likes-qtd/:postId', authMiddleware, LikeController.getQtdLike);
likeRouter.get('/you-like-post/:postId/:userId', authMiddleware, LikeController.youLikedPost);


export { likeRouter };