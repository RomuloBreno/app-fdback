import {Router} from 'express'
import UserController from "./controller/UserController.ts"
import PostController from "./controller/PostController.ts"
import FeedbackController from "./controller/FeedbackController.ts"
const router = Router()

let userController = new UserController()
let postController = new PostController()
let feedbackController = new FeedbackController()

//POST
router.post('/publish-comment/:postId', feedbackController.handle);

router.post('/publish', postController.handle);

router.post('/register', userController.handle);

//GET
router.get('/user/:id', async (req:any, res:any) =>{
   userController.getById(req, res, req.params.id)
});

router.get('/post/:id', async (req:any, res:any) =>{
  postController.getById(req, res, req.params.id)
});

router.get('/feedback/:id', async (req:any, res:any) =>{
  feedbackController.getById(req, res, req.params.id)
});

router.get('/feedbacks/:postId', async (req:any, res:any) =>{
  feedbackController.getFeedbacksByPostId(req, res, req.params.id)
});

export {router}


