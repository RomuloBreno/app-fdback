import type {IFeedbacks} from "../entities/Feedbacks.ts";
import type { IPost } from "../entities/Post.ts";
import type { IUser } from "../entities/User.ts";
import type{ IServices } from "../interfaces/IServices.ts";
import Feedbacks from "../entities/Feedbacks.ts";
import Post  from "../entities/Post.ts";
import User from "../entities/User.ts";
// import type Services from "../interfaces/IServices.ts";

class ServiceFdback implements IServices {
   // Método para exibir informações do usuário
    public async InsertUser(req: Request):Promise<IUser> {
        let user = new User(req.body);
        return await user.save()
    }

    public async InsertPost(req: Request):Promise<IPost>{
        let post = new Post(req.body);
        return await post.save()
    }

    public async InsertFeedback(req: any, res: any):Promise<IFeedbacks> {
        let postById = await Post.findById(req.params.postId)//change to get in file service
        let feedbacks = new Feedbacks(req.body);
        if(!postById)
        return res.status(401).json({message: 'Invalid comment data'});
        feedbacks.save()//save comment
    
        //put comment in array post
        postById.comments?.push(JSON.stringify(feedbacks))
        postById.save()
        return feedbacks 
    }
}

export default ServiceFdback;