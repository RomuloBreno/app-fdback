import type { IPost } from "../entities/Post.ts";
import Post from "../entities/Post.ts";
import type {IPostServices} from '../interfaces/IPostServices.ts';
import PostService from '../services/PostService.ts';
let service: IPostServices = new PostService();

class PostController{
    async handle(req:any, res:any){
      try {
        var result:IPost = await service.InsertPost(req);
        return res.status(201).json({ message: 'Post created', id:result.id, owner:result.owner});
      } catch (error) {
        return res.status(401).json({message: 'Invalid post data'});
      }
    }

    public async getById(req:any, res:any, id:string){
      var result:IPost = await service.getById(id);
      return res.status(200).json({ message: 'User by id', result});
  }
}
export default PostController