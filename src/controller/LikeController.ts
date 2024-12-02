import type { ILoggerService } from "../interfaces/logger/ILoggerService.ts";
import type { ILikeService } from '../interfaces/services/ILikeServices.ts'
import LikeService from '../services/LikeService.ts'
import LoggerService from "../services/LoggerService.ts";


let logger: ILoggerService = new LoggerService();
let service: ILikeService = new LikeService();

class LikeController {
  async toggleLike(req: any, res: any): Promise<any> {
    const postId = req.params.postId
    const userLike = req.body.userId
    if ((!postId || !userLike) || (postId == undefined || userLike == undefined))
      return res.status(404).json({ status: false, result: 'Não foi possivel adicionar o Like' });
    const liked = service.toggleLike(postId, userLike, req.clients)
    if (!liked)
      return res.status(404).json({ status: false, result: 'Não foi possivel adicionar o Like' });
    return res.status(200).json({ status: true, result: liked });
  }


  async getQtdLike(req: any, res: any): Promise<any> {
    const postId = req.params.postId
    if (!postId || postId==undefined)
      return res.status(404).json({ status: false, result: 'Não é possivel listar os Likes de usuário não fornecido' });
    const qtdLikes = await service.getQtdLike(postId)
    return res.status(200).json({ status: true, result: qtdLikes });

  }

  async youLikedPost(req: any, res: any): Promise<any> {
    const postId = req.params.postId
    const userId = req.params.userId
    if ((!postId || !userId) || (postId == undefined || userId == undefined))
      return res.status(404).json({ status: false, result: 'Não é possivel validar like' });
    const youLikedPost = await service.youLikedPost(postId, userId)
    if (youLikedPost === null || youLikedPost === undefined)
      return res.status(404).json({ status: false, result: 'Não é possivel validar like' });
    return res.status(200).json({ status: true, result: youLikedPost });

  }
}


export default new LikeController();
