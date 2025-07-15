import { Router } from 'express'
import PostController from "../controller/PostController.ts"
import { authMiddleware } from '../middleware/AuthMiddleware.ts'
import { rateLimiter } from '../middleware/RateLimit.ts';
import type { AuthenticationWebSocket } from '../websocket.ts';

// import { rateLimiter } from '../middleware/RateLimit.ts';
const postRouter = Router()

let postController = new PostController()


export const createPostRouter = (clients: AuthenticationWebSocket[]) => {
    postRouter.post('/publish', rateLimiter, authMiddleware, async (req: any, res) => {
        req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
        await postController.handle(req, res);
    });

    //esse endpoint é post por que recebe limit pelo body
    postRouter.post('/posts-feed-following/:userId', authMiddleware, async (req: any, res: any) => {
        postController.getPostsByFollowing(req, res)
    });
    postRouter.get('/posts-story/:postStoryId', authMiddleware, async (req: any, res: any) => {
        postController.getPostsByPostStory(req, res)
    });
    postRouter.get('/posts-story-owner/:ownerId', authMiddleware, async (req: any, res: any) => {
        postController.getPostsStorybyOwner(req, res)
    });
    postRouter.get('/post/:id', authMiddleware, async (req: any, res: any) => {
        postController.getById(req, res, req.params.id)
    });
    postRouter.post('/posts/user/:userId', authMiddleware, async (req: any, res: any) => {
        postController.getPostsByUser(req, res, req.params.userId)
    });
    return postRouter

}

export default createPostRouter


