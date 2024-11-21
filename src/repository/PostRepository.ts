
import { BaseRepository } from './base/BaseRepository.ts';
import Post from '../entities/Post.ts';
import User from '../entities/User.ts';
import type { IPost } from '../entities/Post.ts';
import type { IUser } from '../entities/User.ts';

// repositories/UserRepository.ts
export class PostRepository extends BaseRepository<IPost> {
    constructor() {
        super(Post); // Passa o modelo UserModel para o BaseRepository
    }
    async getPostsByFollowing(userId: string): Promise<IPost[] | null> {
        const userFollowing: IUser | null = await User.findOne({ _id: userId }).exec();
        // Dividindo os termos pela barra vertical '|' e removendo espaços extras
        const terms = userFollowing?.job.split('|').map(term => term.trim());
        
        return await Post.aggregate([
          {
            $addFields: {
              creationDate: { $toDate: "$_id" } // Converte o _id para uma data e cria o campo "creationDate"
            }
          },
          {
            $match: {
              $or: terms?.map(term => ({
                $or: [
                  { description: { $regex: term, $options: 'i' } }, // Verifica o termo no campo description
                  { title: { $regex: term, $options: 'i' } } // Verifica o termo no campo title
                ]
              }))
            }
          },
          {
            $sort: { creationDate: -1 } // Ordena os documentos pela data de criação de forma decrescente
          }
        ]).exec();
        
      }
}

export default new PostRepository();