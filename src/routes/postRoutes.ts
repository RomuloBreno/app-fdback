import { Router } from 'express'
import PostController from "../controller/PostController.ts"
import { authMiddleware } from '../middleware/AuthMiddleware.ts'

// import { rateLimiter } from '../middleware/RateLimit.ts';
const postRouter = Router()

let postController = new PostController()


postRouter.post('/publish', authMiddleware, postController.handle);

postRouter.get('/posts', authMiddleware, async (req: any, res: any) => {
    postController.getAll(req, res)
});
postRouter.get('/post/:id', authMiddleware, async (req: any, res: any) => {
    postController.getById(req, res, req.params.id)
});


export { postRouter }


