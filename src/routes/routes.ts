import {Router} from 'express'
import UserController from "../controller/UserController.ts"
import PostController from "../controller/PostController.ts"
import FeedbackController from "../controller/FeedbackController.ts"
import { authMiddleware } from '../middleware/authMiddleware.ts'
const router = Router()

let userController = new UserController()
let postController = new PostController()
let feedbackController = new FeedbackController()

//POST
router.post('/publish-feedback/:postId',authMiddleware, feedbackController.handle);

router.post('/publish', authMiddleware, postController.handle);

//GET
router.get('/user/:id', authMiddleware, async (req:any, res:any) =>{
   userController.getById(req, res, req.params.id)
});

router.get('/posts', authMiddleware, async (req:any, res:any) =>{
  postController.getAll(req, res)
});

router.get('/post/:id', authMiddleware, async (req:any, res:any) =>{
  postController.getById(req, res, req.params.id)
});

router.get('/feedback/:id', authMiddleware, async (req:any, res:any) =>{
  feedbackController.getById(req, res, req.params.id)
});

router.get('/feedbacks/:postId',authMiddleware, async (req:any, res:any) =>{
  feedbackController.getFeedbacksByPostId(req, res, req.params.id)
});

export {router}


