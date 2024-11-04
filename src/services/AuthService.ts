import bcrypt from 'bcrypt';
import User from '../entities/User.ts';
import UserRepository from "../repository/UserRepository.ts";
import dotenv from "dotenv";
import {crypto} from 'crypto-js'

dotenv.config()

let repository = UserRepository
class AuthService {
  async register(name: string, nick:string, email:string, job:string, password: string): Promise<void> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '');//failed web
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let user = new User({name, nick, email, job, passwordHash});
    await repository.create(user);
  }


  async verifyPassword(inputPassword: string, originalSalt: string) {
    const hashToCompare = crypto.createHmac('sha256', originalSalt)
                                 .update(inputPassword)
                                 .digest('hex');
    return hashToCompare; // Retorna true se os hashes coincidem
}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await User.findOne({email});
    if (!user) return false;
    let pass = await this.verifyPassword(password,'16');
    return bcrypt.compare(pass, user.passwordHash);
  }
}

export default new AuthService();
