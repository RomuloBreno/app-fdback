import rateLimit from 'express-rate-limit';
//import { Request, Response, NextFunction } from 'express';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limita a 5 tentativas por IP por janela
  message: {
    result: "Muitas tentativas de login. Tente novamente mais tarde!",
  },
  handler: (req: any, res: any) => {
    res.status(429).json({status:false, result:  "Muitas tentativas. Tente novamente mais tarde." });
  },
});

export const rateLimiter = (req: any, res: any, next: any) => {
  loginRateLimiter(req, res, next);
};
