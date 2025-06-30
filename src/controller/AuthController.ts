import AuthService from '../services/AuthService.ts'
import { verifyToken } from '../utils/tokenUtil.ts';
import { isBase64 } from '../utils/base64Utils.ts';
import path from 'path';
import Logger from '../entities/logger/Logger.ts';
import type { ILoggerService } from '../interfaces/logger/ILoggerService.ts';
import LoggerService from '../services/LoggerService.ts';


let logger: ILoggerService = new LoggerService();
class AuthController {
  async register(req: any, res: any): Promise<any> {
    //validação para envio de json
    if (typeof req.body === 'string') {
      logger.Insert(Object.assign(new Logger(), {status: "Failed body data type", statusCode: 404, content: req.body , method: "Register AuthController"}));
      return res.status(400).json({status:false, result:  'Dados Invalidos' });
    }
    const { result } = req.body;
    if(!isBase64(result)){
      logger.Insert(Object.assign(new Logger(), {status: "Failed base 64", statusCode: 404, content: isBase64(result) , method: "Login AuthController"}));
      return res.status(404).json({status:false, result:  'Falha na comunicação entre cliente e servidor' });
    }
    const user = await AuthService.validateRegister(result)
    if(!user){
      logger.Insert(Object.assign(new Logger(), {status: "Failed validate register", statusCode: 200, content: user , method: "Login AuthController"}));
      return res.status(200).json({status:false, result:  'Não foi possivel registrar o usuário, pois o Email já etá cadastrado' });
    }
    return res.status(200).json({status:true, result:user });
  }

  async login(req: any, res: any): Promise<any> {
    //validação para envio de json
    if (typeof req.body === 'string') {
      logger.Insert(Object.assign(new Logger(), {status: "Failed body data type", statusCode: 404, content: req.body , method: "Login AuthController"}));
      return res.status(400).json({status:false, result:  'Dados Invalidos' });
    }
    //valida a base 64 enviada
    const { result, rcapt } = req.body;
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    // const validRecaptcha = await AuthService.validRecaptcha(rcapt, userIp, userAgent)
    // if(!validRecaptcha || validRecaptcha < 0.3)
    //   return res.status(400).json({ success: false, message: 'O reCAPTCHA é obrigatório.' });
    if(!isBase64(result)){
      logger.Insert(Object.assign(new Logger(), {status: "Failed base64", statusCode: 404, content: isBase64(result) , method: "Login AuthController"}));
      return res.status(404).json({status:false, result:'Falha na comunicação entre cliente e servidor' });
    }
    const token = await AuthService.login(result)
    if(!token){
      logger.Insert(Object.assign(new Logger(), {status: "Failed token", statusCode: 404, content: token , method: "Login AuthController"}));
      return res.status(404).json({status:false, result:  'Não foi possivel autenticar o usuário' });
    }
    return res.status(200).json({status:true, result:token });
  }
  
  async decrypt(req: any, res: any): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(200).json({status:false, result:  'Falha na comunicação entre cliente e servidor' });
    }
    req.userId = decoded.userId;
    return res.status(200).json({status:true, result:decoded});
  }

  async urlImage(req: any, res: any): Promise<any> {
    if (!req.body.fileName) {
      return res.status(400).json({ status: false, result: 'No file uploaded.' });
    }
    const fileName = req.body.fileName;  // Nome original do arquivo
    const key = req.body.key;  // chavbe com path do arquivo
    const extension = path.extname(fileName); // Extrai a extensão
    const urlAssigned = await AuthService.createUrlSigned(key, extension)
    if(!urlAssigned)
      return res.status(400).json({status:false, result:null });
    return res.status(200).json({status:true, result:urlAssigned });
    
  }
}
  


export default new AuthController();
