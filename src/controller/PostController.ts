import type { IPost } from "../entities/Post.ts";
import type { IPostStory } from "../entities/PostStory.ts";
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
        logger.Insert(Object.assign(new Logger(), {status: "Failed", statusCode: 404, content: result , method: "handle PostController"}));
        return res.status(404).json({status:false, result:  'Erro na publicação, por favor tente novamente em instantes' });
      }
      return res.status(201).json({status:true, result:{id: result.id, owner: result.owner} });
    } catch (error) {
      logger.Insert(Object.assign(new Logger(), {status: "Failed", statusCode: 404, content: error.message , method: "handle PostController"}));
      return res.status(404).json({status:false, result:  'Existem campos obrigatórios não preenchidos: Descrição' });
    }
  }

  public async getById(req: any, res: any, id: string) {
    var resultPost: IPost = await service.getById(id);
    if (!resultPost)
      return res.status(404).json({status:false, result:  'Não Encontrado' });
    return res.status(200).json({status:true, result: resultPost });
  }
  public async getPostsByUser(req: any, res: any, id: string) {
    let limit = req.body?.limit || 40
    var resultPost: (IPost | null)[] | false = await service.getPostsByUser(id, limit);
    if (!resultPost)
      return res.status(404).json({status:false, result:  'Não Encontrado' });
    return res.status(200).json({status:true, result: resultPost });
  }
  public async getAll(req: any, res: any) {
    var resultPost: IPost[] = await service.getAll();
    if (!resultPost)
      return res.status(404).json({status:false, result:  'Não Encontrado' });
    return res.status(200).json({status:true, result: resultPost });
  }
  public async getPostsByFollowing(req: any, res: any) {
    let userId = req.params.userId;
    let limit = req.body?.limit || 40
    var resultPost: IPost[] | null = await service.getPostsByFollowing(userId, limit);
    if (!resultPost)
      return res.status(404).json({status:false, result:  'Não Encontrado' });
    return res.status(200).json({status:true, result: resultPost });
  }
  public async getPostsByPostStory(req: any, res: any) {
    let postStory = req.params.postStoryId;
    var resultPost: (IPost | null)[] = await service.getPostsByStoryPosts(postStory);
    if (!resultPost)
      return res.status(404).json({status:false, result:  'Não Encontrado' });
    return res.status(200).json({status:true, result: resultPost });
  }

public async getPostsStorybyOwner(req: any, res: any) {
  let ownerId = req.params.ownerId
  var resultPost: IPostStory[] = await service.getPostsStorybyOwner(ownerId);
  if (!resultPost)
    return res.status(404).json({status:false, result:  'Não Encontrado' });
  return res.status(200).json({status:true, result: resultPost });
}

}


export default PostController