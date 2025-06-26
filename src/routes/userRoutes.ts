import { Router } from 'express'
import UserController from "../controller/UserController.ts"
import PostController from "../controller/PostController.ts"
import { authMiddleware } from '../middleware/AuthMiddleware.ts'

// import { rateLimiter } from '../middleware/RateLimit.ts';
const userRouter = Router()
let userController = new UserController()


userRouter.post('/update/user/:id', authMiddleware, async (req: any, res: any) => {
    userController.update(req, res, req.params.id);
});

userRouter.get('/user/:id', authMiddleware, async (req: any, res: any) => {
    userController.getById(req, res, req.params.id)
});
userRouter.get('/user/nick/:nick', authMiddleware, async (req: any, res: any) => {
    userController.getByNick(req, res, req.params.nick)
});

export { userRouter }


