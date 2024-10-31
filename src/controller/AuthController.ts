import AuthService from '../services/AuthService.ts'
import { generateToken } from '../utils/tokenUtil.ts';
import User from '../entities/User.ts';

class AuthController {
  async register(req: any, res: any): Promise<Response> {
    const {name, email, job, password } = req.body;

    try {
      await AuthService.register(name, email, job, password);
      return res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      if(error.message.split(" ").includes("duplicate"))
        return res.status(500).json({ error: 'Erro ao registrar o usuário, esse e-mail ja foi registrado' });
      return res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
  }

  async login(req: any, res: any): Promise<Response> {
    const { email, password } = req.body;

    const isValidUser = await AuthService.validateUser(email, password);
    if (!isValidUser) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Gera o token JWT com o ID do usuário
    const token = await generateToken(user.id);
    return res.status(200).json({ token });
  }
}

export default new AuthController();
