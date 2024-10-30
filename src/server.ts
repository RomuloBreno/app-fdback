import express from 'express'
import UserController from "./controller/UserController.ts"
import PostController from "./controller/PostController.ts"
import FeedbackController from "./controller/FeedbackController.ts"
import dotenv from 'dotenv'

let userController = new UserController()
let postController = new PostController()
let feedbackController = new FeedbackController()

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//POST
app.post('/publish-comment/:postId', feedbackController.handle);

app.post('/publish', postController.handle);

app.post('/register', userController.handle);



//GET
app.get('/user/:id', async (req:any, res:any) =>{
   userController.getById(req, res, req.params.id)
});

app.get('/post/:id', async (req:any, res:any) =>{
  postController.getById(req, res, req.params.id)
});

app.get('/feedback/:id', async (req:any, res:any) =>{
  feedbackController.getById(req, res, req.params.id)
});

app.get('/feedbacks/:postId', async (req:any, res:any) =>{
  feedbackController.getFeedbacksByPostId(req, res, req.params.id)
});




//init 
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});