import type { IFollows } from "../entities/Follows.ts";
import Logger from "../entities/logger/Logger.ts";
import type { ILoggerService } from "../interfaces/logger/ILoggerService.ts";
import type { IFollowService } from '../interfaces/services/IFollowServices.ts'
import FollowService from '../services/FollowService.ts'
import LoggerService from "../services/LoggerService.ts";


let logger: ILoggerService = new LoggerService();
let service: IFollowService = new FollowService();

class FollowController {
  async addFollow(req: any, res: any): Promise<any> {
    const anotherUserId = req.params.anotherUserId
    const { follower } = req.body
    if (!anotherUserId || !follower) {
      logger.Insert(Object.assign(new Logger(), { status: "Failed", statusCode: 404, content: follower, method: "Add FollowController" }));
      return res.status(404).json({ status: false, result: 'Não é possivel adicionar o follow de um usuário não fornecido' });
    }
    const addFollow = await service.addFollow(anotherUserId, follower)
    if (!addFollow) {
      logger.Insert(Object.assign(new Logger(), { status: "Failed", statusCode: 404, content: addFollow, method: "Add FollowController" }));
      return res.status(404).json({ status: false, result: 'Não foi possivel adicionar o usuário como follower' });
    }
    return res.status(200).json({ status: true, result: addFollow });
  }

  async removeFollow(req: any, res: any): Promise<any> {
    const anotherUserId = req.params.anotherUserId
    const { follower } = req.body
    if (!anotherUserId || !follower) {
      logger.Insert(Object.assign(new Logger(), { status: "Failed", statusCode: 404, content: follower, method: "Remove FollowController" }));
      return res.status(404).json({ status: false, result: 'Não é possivel remover o follow de um usuário não fornecido' });
    }
    const removeFollow = await service.removeFollow(anotherUserId, follower)
    if (!removeFollow) {
      logger.Insert(Object.assign(new Logger(), { status: "Failed", statusCode: 404, content: removeFollow, method: "Remove FollowController" }));
      return res.status(404).json({ status: false, result: 'Não foi possivel registrar a remoção do follow usuário' });
    }
    return res.status(200).json({ status: true, result: removeFollow });
  }


  async getQtdFollow(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    if (!userId)
      return res.status(404).json({ status: false, result: 'Não é possivel listar os follows de usuário não fornecido' });
    const qtdFollows = await service.getQtdFollow(userId)
    // if(!qtdFollows)
    //   return res.status(404).json({status:false, result:  'Não é possivel listar os follows do usuário' });
    return res.status(200).json({ status: true, result: qtdFollows });

  }
  async getFollowersByUser(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    if (!userId)
      return res.status(404).json({ status: false, result: 'Não é possivel listar os follows de usuário não fornecido' });
    const followers = await service.getFollowersByUser(userId)
    return res.status(200).json({ status: true, result: followers });

  }
  async getFollowingByUser(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    if (!userId)
      return res.status(404).json({ status: false, result: 'Não é possivel listar os follows de usuário não fornecido' });
    const following = await service.getFollowingByUser(userId)
    return res.status(200).json({ status: true, result: following });

  }
  async youFollowMe(req: any, res: any): Promise<any> {
    const anotherUserId = req.params.anotherUserId
    const userId = req.params.userId
    if (!anotherUserId || !userId)
      return res.status(404).json({ status: false, result: 'Não é possivel validar follow' });
    const youFollowMe = await service.youFollowMe(anotherUserId, userId)
    if (youFollowMe === null || youFollowMe === undefined)
      return res.status(404).json({ status: false, result: 'Não é possivel validar follow' });
    return res.status(200).json({ status: true, result: youFollowMe });

  }
}



export default new FollowController();
