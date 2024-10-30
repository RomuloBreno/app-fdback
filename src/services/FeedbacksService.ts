import Post from "../entities/Post.ts";
import Feedbacks from "../entities/Feedbacks.ts";
import { BaseRepository } from "../repository/BaseRepository.ts";
import type { IPost } from "../entities/Post.ts";
import type { IFeedbacks } from "../entities/Feedbacks.ts";
import type { IFeedbackServices } from "../interfaces/IFeedbackServices.ts";

let baseRepositoryFeedBack: BaseRepository<IFeedbacks> = new BaseRepository(Feedbacks);
let baseRepositoryPost: BaseRepository<IPost> = new BaseRepository(Post);

class FeedbacksService implements IFeedbackServices {
    public async InsertFeedback(req: any, res: any): Promise<IFeedbacks> {
        let postById = await Post.findById(req.params.postId)//change to get in file service
        let feedbacks = new Feedbacks(req.body);
        if (!postById)
            return res.status(401).json({ message: 'Invalid comment data' });
        baseRepositoryFeedBack.create(feedbacks)

        //put comment in array post
        postById.comments?.push(feedbacks)
        baseRepositoryPost.update(postById.id, postById)//save comment in post
        return feedbacks
    }
    public async getById(id: string){
        let result = await baseRepositoryFeedBack.getById(id)
        return result
      }

      public async getFeedbacksByPostId(id: string):Promise<IFeedbacks[] | undefined>{
        let result = await baseRepositoryPost.getById(id)
        let feedbacks:IFeedbacks[] | undefined = result?.comments
        return feedbacks
      }

}

export default FeedbacksService;