import type { INotify } from "../entities/Notify.ts";
import type { ILoggerService } from "../interfaces/logger/ILoggerService.ts";
import type { INotifyService } from '../interfaces/services/INotifyService.ts'
import NotifyService from '../services/NotifyService.ts'
import LoggerService from "../services/LoggerService.ts";


let logger: ILoggerService = new LoggerService();
let service: INotifyService = new NotifyService();

class NotifyController {
  async getQtdNotify(req: any, res: any): Promise<any> {
    const userId = req.params.userId
    if (!userId || userId==undefined)
      return res.status(404).json({ status: false, result: 'Não é possivel listar os Notifys de usuário não fornecido' });
    const qtdNotifys = await service.getNotifyByUser(userId)
    return res.status(200).json({ status: true, result: qtdNotifys });

  }
}


export default new NotifyController();
