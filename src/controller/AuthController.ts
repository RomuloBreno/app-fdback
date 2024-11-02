import AuthService from '../services/AuthService.ts'
import { generateToken, verifyToken } from '../utils/tokenUtil.ts';
import User from '../entities/User.ts';

class AuthController {
  async register(req: any, res: any): Promise<Response> {
    if (typeof req.body === 'string') {
      return res.status(400).json({status:false, result:  'JSON is not valid' });
    }
    const {name, email, job, password } = req.body;

    try {
      await AuthService.register(name, email, job, password);
      return res.status(201).json({status:true, result:  'Usuário registrado com sucesso' });
    } catch (error) {
      if(error.message.split(" ").includes("duplicate"))
        return res.status(400).json({status:false, result:  'Erro ao registrar o usuário, esse e-mail ja foi registrado' });
      return res.status(400).json({status:false, result:  'Erro ao registrar o usuário' });
    }
  }

  async login(req: any, res: any): Promise<Response> {
    if (typeof req.body === 'string') {
      return res.status(400).json({status:false, result:  'Credenciais inválidas' });
    }
    const { email, password } = req.body;
    
    const isValidUser = await AuthService.validateUser(email, password);
    if (!isValidUser) {
      return res.status(400).json({status:false, result:  'Credenciais inválidas' });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({status:false, result:  'Usuário não encontrado' });
    }
    
    // Gera o token JWT com o ID do usuário
    const token = await generateToken(user.id);
    return res.status(200).json({status:true, result:token });
  }
  async decrypt(req: any, res: any): Promise<Response> {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(404).json({status:false, result:  'Erro no jwt' });
    }
    req.userId = decoded.userId;
    return res.status(200).json({status:true, result:decoded});
  }
}

  



export default new AuthController();
