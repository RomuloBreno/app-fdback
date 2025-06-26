import type { IUser } from "../entities/User.ts";
import type { IUserServices } from "../interfaces/services/IUserServices.ts";
import User from "../entities/User.ts";
import UserRepository from "../repository/UserRepository.ts";
import mongoose from "mongoose";

let repository = UserRepository
class UserService implements IUserServices {
  // Método para exibir informações do usuário
  public async InsertUser(req: any): Promise<IUser> {
    let user = new User(req.body);
    return await repository.create(user);
  }
  public async getById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let result = await repository.getById(id)
    return result
  }
  public async getByNick(nick: string) {
    let result = await repository.getByNick(nick)
    return result
  }
  public async update(id: string, req:any) {
    let user = new User(req.body);
    let result = await repository.update(id, user)
    return result
  }
}

export default UserService;