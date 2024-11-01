import type { IPost } from "../entities/Post.ts";
import type { IPostServices } from '../interfaces/services/IPostServices.ts';
import type { ILoggerService } from '../interfaces/logger/ILoggerService.ts';
import PostService from '../services/PostService.ts';
import LoggerService from '../services/LoggerService.ts';
import Logger from '../entities/logger/Logger.ts';

let logger: ILoggerService = new LoggerService();
let service: IPostServices = new PostService();


class PostController {
  async handle(req: any, res: any) {
    try {
      var result: IPost = await service.InsertPost(req);
      if (!result){
        return res.status(404).json({ message: 'User not created' });
      }
      return res.status(201).json({ message: 'Post created', id: result.id, owner: result.owner });
    } catch (error) {
      logger.Insert(Object.assign(new Logger(), {status: "Failed", statusCode: 404, content: error.message , method: "handle PostController"}));
      return res.status(404).json({ message: 'Invalid post data' });
    }
  }

  public async getById(req: any, res: any, id: string) {
    var result: IPost = await service.getById(id);
    if (!result)
      return res.status(404).json({ message: 'Not find' });
    return res.status(200).json({ message: 'Post by id', result });
  }
  public async getAll(req: any, res: any) {
    var result: IPost[] = await service.getAll();
    if (!result)
      return res.status(404).json({ message: 'Not find' });
    return res.status(200).json({ message: 'Posts by User', result });
  }
}
export default PostController