import bcrypt from 'bcrypt';
import User from '../entities/User.ts';
import type { IUser } from '../entities/User.ts';
import UserRepository from "../repository/UserRepository.ts";
import { generateSignedUrl } from "../utils/s3Utils.ts";
import dotenv from "dotenv";
import { generateToken } from '../utils/tokenUtil.ts';
import { createAssessment } from '../utils/reCaptcha.ts';

dotenv.config()

let repository = UserRepository
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
class AuthService {
  async register(name: string, nick: string, email: string, job: string, password: string): Promise<IUser | null> {
    const saltRoundsEnv = process.env.BCRYPT_SALT_ROUNDS;
    // const saltRounds = Number.isInteger(+saltRoundsEnv!) ? parseInt(saltRoundsEnv!) : 11;
    const salt = await bcrypt.genSalt(+saltRoundsEnv!)
    const passwordHash = bcrypt.hashSync(password, salt);
    let user = new User({ name, nick, email, job, passwordHash });
    const userExist = await repository.getByEmail(email)
    if(userExist)
      return null
    return await repository.create(user);
  }

  //metodo de apoio ao login para validação de usuário
  async validateUser(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email }); //passar função apra repositorio
    if (!user) return false;

    return { user: user.id, valid: bcrypt.compare(password, user.passwordHash) }
  }

  // metodo cria url assinada para publicação no storage
  async createUrlSigned(key: string, extension: string): Promise<any> {
    return generateSignedUrl(key, extension)
  }

  async login(result: any): Promise<any> {
    //mapeia base64 para variaveis
    const decoded = atob(result).split(':')
    const email = decoded[0]
    const pass = decoded[1]
    if (email === '' || pass === '' || email === null || pass === null)
      return false

    //valida se o usuário enviado existe e se a senha é compativel
    const isValidUser = await this.validateUser(email, pass);
    if (!isValidUser.valid) {
      return false
    }
    // Gera o token JWT com o ID do usuário
    return await generateToken(isValidUser.user);
  }

  //metodo de validação do reCaptach do google
  async validRecaptcha(captchaToken: string, userIp: string, userAgent: string) {
    // Verifique se o captchaToken foi enviado
    if (!captchaToken) {
      return false
    }
    try {
      // Validação do reCAPTCHA com a API do Google
      const captchaResponse: number | null = await createAssessment(captchaToken, userIp, userAgent, {})
      return captchaResponse
    } catch (error) {
      return false
    }
  }

  // metodo de apoio para validação do registro de novos usuários
  async validateRegister(result: any): Promise<any> {
    //valida a base64 
    let decoded = atob(result).split(':')
    const name = decoded[0]
    const nick = decoded[1]
    const email = decoded[2]
    const job = decoded[3]
    const password = decoded[4]

    const user = await this.register(name, nick, email, job, password);
    if (!user || !user?.email)
      return false
    return user
  }


}

export default new AuthService();
