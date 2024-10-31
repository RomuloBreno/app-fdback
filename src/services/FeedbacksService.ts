import Post from "../entities/Post.ts";
import Feedbacks from "../entities/Feedbacks.ts";
import type { IPost } from "../entities/Post.ts";
import type { IFeedback } from "../entities/Feedbacks.ts";
import type { IFeedbackServices } from "../interfaces/IFeedbackServices.ts";
import FeedbackRepository from "../repository/FeedbacksRepository.ts";
import PostRepository from "../repository/PostRepository.ts";

let repositoryFeedBack = FeedbackRepository;
let repositoryPost = PostRepository;

class FeedbacksService implements IFeedbackServices {
    public async InsertFeedback(req: any, res: any): Promise<IFeedback> {
        let postById = await Post.findById(req.params.postId)//change to get in file service
        let feedbacks = new Feedbacks(req.body);
        if (!postById)
            return res.status(401).json({ message: 'Invalid comment data' });
        repositoryFeedBack.create(feedbacks)

        //put comment in array post
        postById.comments?.push(feedbacks)
        repositoryPost.update(postById.id, postById)//save comment in post
        return feedbacks
    }
    public async getById(id: string){
        let result = await repositoryFeedBack.getById(id)
        return result
      }

      public async getFeedbacksByPostId(id: string):Promise<IFeedback[] | undefined>{
        let result = await repositoryPost.getById(id)
        let feedbacks:IFeedback[] | undefined = result?.comments
        return feedbacks
      }

}

export default FeedbacksService;