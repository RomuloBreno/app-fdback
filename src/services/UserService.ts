import type { IUser } from "../entities/User.ts";
import type { IUserServices } from "../interfaces/IUserServices.ts";
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
}

export default UserService;