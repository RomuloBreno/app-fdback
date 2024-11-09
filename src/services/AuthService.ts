import bcrypt from 'bcrypt';
import User from '../entities/User.ts';
import type { IUser } from '../entities/User.ts';
import UserRepository from "../repository/UserRepository.ts";
import dotenv from "dotenv";

dotenv.config()

let repository = UserRepository
class AuthService {
  async register(name: string, nick:string, email:string, job:string, password: string): Promise<IUser> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '11');//failed web
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let user = new User({name, nick, email, job, passwordHash});
    return await repository.create(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await User.findOne({email}); //passar função apra repositorio
    if (!user) return false;
    
    return {user:user.id, valid:bcrypt.compare(password, user.passwordHash)}
  }
}

export default new AuthService();
