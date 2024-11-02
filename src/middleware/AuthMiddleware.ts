import { verifyToken } from '../utils/tokenUtil.ts';

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(404).json({ result: 'Token não fornecido' });
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ result: 'Token inválido ou expirado' });
  }
};
