import type { IUser } from "../entities/User.ts";
import type { IUserServices } from '../interfaces/services/IUserServices.ts';
import type { ILoggerService } from '../interfaces/logger/ILoggerService.ts';
import UserService from '../services/UserService.ts';
import LoggerService from '../services/LoggerService.ts';
import Logger from '../entities/logger/Logger.ts';

let logger: ILoggerService = new LoggerService();
let service: IUserServices = new UserService();

class UserController {
  async handle(req: any, res: any) {
    try {
      var result: IUser = await service.InsertUser(req);
      if (!result){
        return res.status(404).json({ message: 'User not created' });
      }
      return res.status(201).json({ message: 'User created', id: result.id });
    } catch (error) {
      logger.Insert(Object.assign(new Logger(), {status: "Failed", statusCode: 404, content: error.message , method: "handle UserController"}));
      return res.status(404).json({ message: 'Invalid user data' });
    }
  }

  public async getById(req: any, res: any, id: string) {
    var result: IUser = await service.getById(id);
    if (!result)
      return res.status(404).json({ message: 'Not find' });
    return res.status(200).json({ result });
  }
}
export default UserController