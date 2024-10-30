import type { IUser } from "../entities/User.ts";
import type{ IUserServices } from "../interfaces/IUserServices.ts";
import User from "../entities/User.ts";
import { BaseRepository } from "../repository/BaseRepository.ts";

let baseRepository: BaseRepository<IUser> = new BaseRepository(User);
class UserService implements IUserServices {
   // Método para exibir informações do usuário
    public async InsertUser(req: any):Promise<IUser> {
        let user = new User(req.body);
        return await baseRepository.create(user);
    }
     public async getById(id: string){
       let result = await baseRepository.getById(id)
       return result
     }
}

export default UserService;