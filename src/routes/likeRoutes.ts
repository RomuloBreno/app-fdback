import { Router } from 'express';
import LikeController from '../controller/LikeController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';


const likeRouter = Router();

export const createLikeRouter = (clients: WebSocket[]) => {
    likeRouter.post('/publish-like/:postId', rateLimiter, authMiddleware, async (req: any, res) => {
        req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
        await LikeController.toggleLike(req, res);
    });
    likeRouter.get('/likes-qtd/:postId', rateLimiter, authMiddleware, LikeController.getQtdLike);
    likeRouter.get('/you-like-post/:postId/:userId', authMiddleware, LikeController.youLikedPost);

    return likeRouter;
};

export default createLikeRouter;