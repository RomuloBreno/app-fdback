import type { IFeedback} from "../entities/Feedbacks.ts";
import Feedbacks from "../entities/Feedbacks.ts";
import Post from "../entities/Post.ts";
import type {IFeedbackServices} from '../interfaces/IFeedbackServices.ts';
import type {IPostServices} from '../interfaces/IPostServices.ts';
import FeedbackServices from '../services/FeedbacksService.ts';
import PostServices from '../services/PostService.ts';
let service: IFeedbackServices = new FeedbackServices();
let servicePost: IPostServices = new PostServices();

class FeedbackController{
    async handle(req:any, res:any){
      try {
        var result:IFeedback= await service.InsertFeedback(req, res);
        if(!result)
          return res.status(404).json({ message: 'Comment not created'});
        return res.status(201).json({ message: 'Comment created', id: result.id, owner: result.author});
    
      } catch (error) {
        return res.status(401).json({message: 'Invalid comment data'});
      }
    }

    public async getById(req:any, res:any, id:string){
      let feedbackById = await service.getById(id)//change to get in file service
      if(!feedbackById)
        return res.status(404).json({message:'Not find'});
      return res.status(200).json({feedbackById});
    }

    public async getFeedbacksByPostId(req:any, res:any, id:string){
      let feedbacksByPostId = await service.getFeedbacksByPostId(id)
      if(!feedbacksByPostId)
        return res.status(404).json({ message: 'Not find Comments'});
      return res.status(200).json({feedbacksByPostId});
    }

}
export default FeedbackController