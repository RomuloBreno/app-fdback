import type { IUser } from "../entities/User.ts";
import User from "../entities/User.ts";
import type {IUserServices} from '../interfaces/IUserServices.ts';
import UserService from '../services/UserService.ts';
let service: IUserServices = new UserService();

class UserController{
    async handle(req:any, res:any){
        try {
            var result:IUser = await service.InsertUser(req);
            return res.status(201).json({ message: 'User created', id:result.id});
          } catch (error) {
            return res.status(401).json({message: 'Invalid user data'});
          }
    }

    public async getById(req:any, res:any, id:string){
        var result:IUser = await service.getById(id);
        return res.status(200).json({ message: 'User by id', result});
    }
}
export default UserController