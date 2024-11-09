import AuthService from '../services/AuthService.ts'
import { generateToken, verifyToken } from '../utils/tokenUtil.ts';
import User from '../entities/User.ts';

class AuthController {
  async register(req: any, res: any): Promise<any> {
    //validação para envio de json
    if (typeof req.body === 'string') {
      return res.status(400).json({status:false, result:  'Dados Invalidos' });
    }

    //valida a base64 
    const { result } = req.body;
    if(!isBase64(result))
      return res.status(404).json({status:false, result:  'JSON Invalido' });

    let decoded = atob(result).split(':')
    const name = decoded[0]
    const nick = decoded[1]
    const email = decoded[2]
    const job = decoded[3]
    const password = decoded[4]

    try {
      const user = await AuthService.register(name, nick, email, job, password);
      if(!user || !user?.email)
        return res.status(400).json({status:false, result:  'Erro ao registrar o usuário' });
      return res.status(201).json({status:true, result:  'Usuário registrado com sucesso' });
    } catch (error) {
      if(error.message.split(" ").includes("duplicate"))
        return res.status(400).json({status:false, result:  'Erro ao registrar o usuário, esse e-mail ja foi registrado' });
      return res.status(400).json({status:false, result:  'Erro ao registrar o usuário' });
    }
  }

  async login(req: any, res: any): Promise<any> {
    //validação para envio de json
    if (typeof req.body === 'string') {
      return res.status(400).json({status:false, result:  'Dados Invalidos' });
    }
    //valida a base 64 enviada
    const { result } = req.body;
    if(!isBase64(result))
      return res.status(404).json({status:false, result:  'JSON Invalido' });
    //mapeia base64 para variaveis
    let decoded = atob(result).split(':')
    const email = decoded[0]
    const pass = decoded[1]
    if(email === '' || pass==='' || email=== null || pass ===null)
      return res.status(404).json({status:false, result:  'Dados do JSON invalidos' });

    //valida se o usuário enviado existe e se a senha é compativel
    const isValidUser = await AuthService.validateUser(email,pass);
    if (!isValidUser.valid) {
      return res.status(400).json({status:false, result:  'Credenciais inválidas' });
    }
    // Gera o token JWT com o ID do usuário
    const token = await generateToken(isValidUser.user);
    return res.status(200).json({status:true, result:token });
  }

  async decrypt(req: any, res: any): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(200).json({status:false, result:  'Erro no jwt' });
    }
    req.userId = decoded.userId;
    return res.status(200).json({status:true, result:decoded});
  }
}
  
function isBase64(str:string) {
  if (typeof str !== 'string') {
      return false;
  }

  // Verifica se a string está vazia ou tem um comprimento múltiplo de 4
  if (str.length === 0 || str.length % 4 !== 0) {
      return false;
  }

  // Expressão regular para validar o formato Base64
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  return base64Regex.test(str);
}


export default new AuthController();
