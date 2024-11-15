import type { IFollows } from "../entities/Follows.ts";
import { ILoggerService } from "../interfaces/logger/ILoggerService.ts";
import type {IFollowService} from '../interfaces/services/IFollowServices.ts'
import FollowService from '../services/FollowService.ts'
import LoggerService from "../services/LoggerService.ts";


let logger: ILoggerService = new LoggerService();
let service: IFollowService = new FollowService();

class FollowController {
  async addFollow(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    const {follower} = req.body
    if(!userId || !follower)
        return res.status(404).json({status:false, result:  'Não é possivel adicionar o follow de um usuário não fornecido' });
    const addFollow = await service.addFollow(userId, follower)
    if(!addFollow)
      return res.status(404).json({status:false, result:  'Não foi possivel registrar o usuário' });
    return res.status(200).json({status:true, result:addFollow });
  }

  async removeFollow(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    const {follower} = req.body
    if(!userId || !follower)
        return res.status(404).json({status:false, result:  'Não é possivel remover o follow de um usuário não fornecido' });
    const removeFollow = await service.removeFollow(userId,follower)
    if(!removeFollow)
      return res.status(404).json({status:false, result:  'Não foi possivel registrar a remoção do follow usuário' });
    return res.status(200).json({status:true, result:removeFollow });
  }
  
  
  async getQtdFollow(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    if(!userId)
        return res.status(404).json({status:false, result:  'Não é possivel listar os follows de usuário não fornecido' });
    const qtdFollows = await service.getQtdFollow(userId)
    if(!qtdFollows)
      return res.status(404).json({status:false, result:  'Não foi possivel registrar o usuário' });
    return res.status(200).json({status:true, result:qtdFollows });
    
  }
}
  


export default new FollowController();
