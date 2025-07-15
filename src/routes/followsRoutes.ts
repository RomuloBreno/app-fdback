import { Router } from 'express';
import FollowController from '../controller/FollowController.ts';
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';
import type { AuthenticationWebSocket } from '../websocket.ts';


const followsRouter = Router();

export const createFollowRouter = (clients: AuthenticationWebSocket[]) => {
    followsRouter.post('/follow-user/:anotherUserId/', rateLimiter, authMiddleware, async (req: any, res) => {
        req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
        await FollowController.addFollow(req, res);
    });
    followsRouter.post('/unfollow-user/:anotherUserId', rateLimiter, authMiddleware, async (req: any, res) => {
        req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
        await FollowController.removeFollow(req, res);
    });
    followsRouter.get('/follows-qtd/:userId', authMiddleware, FollowController.getQtdFollow);
    followsRouter.get('/you-follow-me/:anotherUserId/:userId', authMiddleware, FollowController.youFollowMe);
    followsRouter.get('/followers/user/:userId', authMiddleware, FollowController.getFollowersByUser);
    followsRouter.get('/following/user/:userId', authMiddleware, FollowController.getFollowingByUser);
    return followsRouter;
};


export default createFollowRouter;