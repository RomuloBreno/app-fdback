import Post from "../entities/Post.ts";
import Feedbacks from "../entities/Feedbacks.ts";
import type { IPost } from "../entities/Post.ts";
import type { IFeedback } from "../entities/Feedbacks.ts";
import type { IFeedbackServices } from "../interfaces/services/IFeedbackServices.ts";
import FeedbackRepository from "../repository/FeedbacksRepository.ts";
import PostRepository from "../repository/PostRepository.ts";
import mongoose from "mongoose";
import Feedback from "../entities/Feedbacks.ts";
import { notify } from "../utils/notify.ts";

let repositoryFeedBack = FeedbackRepository;
let repositoryPost = PostRepository;

class FeedbacksService implements IFeedbackServices {
  public async InsertFeedback(req: any, res: any): Promise<IFeedback> {
    console.log("Criando feedback")
    let postById = await Post.findById(req.params.postId)//change to get in file service
    let feedbacks = new Feedbacks(req.body);
    if (!postById)
      return res.status(401).json({ status: false, result: 'Invalid feedback data' });
    repositoryFeedBack.create(feedbacks)
    
    //put comment in array post
    postById.comments?.push(feedbacks.id)
    repositoryPost.update(postById.id, postById)//save comment in post
    
    //notify
    const paramsNotifyFeedback = ({
      event: 'Feedback',
      postId : postById?._id,
      author: feedbacks?.author,
      message: `Usuário ${feedbacks?.author} deu um feedback no post ${postById?._id}.`,
    })
    const userIdNotified = postById.owner?._id.toString()
    notify(req.clients, paramsNotifyFeedback, userIdNotified)
    return feedbacks
  }
  public async getById(id: string): Promise<IFeedback | null | false> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let result: IFeedback | null = await repositoryFeedBack.getById(id)
    return result
  }

  public async getFeedbacksByPostId(id: string): Promise<IFeedback[] | null | false> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let result = await repositoryFeedBack.getAllByPostId(id)
    return result
  }
  public async getFeedbacksWithFilterByPostId(id: string): Promise<IFeedback[] | null | false> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let result = await repositoryFeedBack.getWithFilterByPostId(id)
    return result
  }

}

export default FeedbacksService;