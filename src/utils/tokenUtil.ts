import jwt from 'jsonwebtoken';

export const generateToken = async (userId: any): Promise<string> => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): any => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }catch(error){
    return false
  }

};
