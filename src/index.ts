import express from 'express'
import {connect} from './database/mongodb.ts';
import type { IUser } from './entities/User.ts';
import type { IPost } from './entities/Post.ts';
import type { IFeedbacks } from './entities/Feedbacks.ts';
import ServiceFdback from './services/ServiceFdback.ts';
import type {IServices} from './interfaces/IServices.ts';
import Feedbacks from "./entities/Feedbacks.ts";
import Post  from "./entities/Post.ts";
import User from "./entities/User.ts";


connect();
let service: IServices = new ServiceFdback();
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/publish-comment/:postId', async (req: any, res: any) => {
  try {
    var result:IFeedbacks = await service.InsertFeedback(req, res);
    return res.status(201).json({ message: 'Comment created', id: result.id, owner: result.author});

  } catch (error) {
    return res.status(401).json({message: 'Invalid comment data'});
  }
});

app.post('/publish', async (req: any, res: any) => {
  try {
    var result:IPost = await service.InsertPost(req);
    return res.status(201).json({ message: 'Post created', id:result.id, owner:result.owner});
  } catch (error) {
    return res.status(401).json({message: 'Invalid post data'});
  }
});

app.post('/register', async (req: any, res: any) => {
  try {
    var result:IUser = await service.InsertUser(req);
    return res.status(201).json({ message: 'User created', id:result.id});
  } catch (error) {
    return res.status(401).json({message: 'Invalid user data'});
  }
});

app.get('/user/:id', async (req: any, res: any) => {
  let userById = await User.findById(req.params.id)//change to get in file service
  return res.status(200).json({ message: 'User by id', userById});
});

app.get('/post/:id', async(req: any, res: any) => {
  let postsById = await Post.findById(req.params.id)//change to get in file service
  return res.status(200).json({ message: 'Post by id', postsById});
});

app.get('/comments/:id',async (req: any, res: any) => {
  let commentById = await Feedbacks.findById(req.params.id)//change to get in file service
  return res.status(200).json({ message: 'Comment by id', commentById});
});

app.get('/comments/:postId', async (req: any, res: any) => {
  let postsById = await Post.findById(req.params.id)//change to get in file service
  let comments = postsById?.comments
  return res.status(200).json({ message: 'Comments by post id: '+ req.params.postId, comments: comments});
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});