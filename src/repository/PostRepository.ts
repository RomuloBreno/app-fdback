
import { BaseRepository } from './base/BaseRepository.ts';
import Post from '../entities/Post.ts';
import Follows from '../entities/Follows.ts';
import PostStory from '../entities/PostStory.ts';
import User from '../entities/User.ts';
import type { IPost } from '../entities/Post.ts';
import type { IUser } from '../entities/User.ts';
import type { IPostStory } from '../entities/PostStory.ts';
import type { IFollows } from '../entities/Follows.ts';
import mongoose from 'mongoose';

// repositories/UserRepository.ts
export class PostRepository extends BaseRepository<IPost> {
  constructor() {
    super(Post); // Passa o modelo UserModel para o BaseRepository
  }
  async getPostsByJob(userId: string, limit?:number): Promise<IPost[] | null> {
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
      },
      {
        $limit: limit || 40
      }
    ]).exec();

  }
  async getPostsByFollowing(userId: string, limit?: number): Promise<IPost[] | null> {
    const userFollowing: IFollows | null = await Follows.findOne({ _id: userId }).exec();
    const following = userFollowing?.following?.map(id => new mongoose.Types.ObjectId(id));
    return await Post.aggregate([
      {
        $addFields: {
          creationDate: { $toDate: "$_id" } // Converte o _id para uma data
        }
      },
      {
        $match: {
          // Filtra posts que pertencem aos usuários seguidos
          owner: { $in: following || [] }
        }
      },
      {
        $sort: { creationDate: -1 } // Ordena de forma decrescente
      },
      {
        $limit: limit || 40 // Limita o número de resultados
      }
    ]).exec();
  }
  
  async getPostsByPostStory(postStory: string): Promise<(IPost | null)[]> {
    const postStoryRecord: IPostStory | null = await PostStory.findOne({ _id: postStory }).exec();
    // Dividindo os termos pela barra vertical '|' e removendo espaços extras
    let postsByPostStoryId: (IPost | null)[] = await Promise.all(
      postStoryRecord?.postStory?.map(async (postId) => {
          const postRecord: IPost | null = await this.model.findOne({ _id: postId?.toString() }).exec();
          return postRecord; // Retorna apenas os registros encontrados
      }) || []
  );
    return postsByPostStoryId

  }
  async getPostsByUser(userId: string, limit?:number): Promise<(IPost | null)[]> {
    const posts: IPost[] | null = await Post.aggregate([
      // Filtra os documentos pelo campo "owner"
      {
          $match: {
              owner: new mongoose.Types.ObjectId(userId), // Certifique-se de converter o userId se necessário
          },
      },
      // Ordena os documentos por ordem de criação decrescente (_id implícito)
      {
          $sort: { _id: -1 },
      },
      // Limita a quantidade de resultados
      {
          $limit: limit || 100, // Defina o número máximo de documentos a serem retornados
      },
  ]).exec();
  
    // Dividindo os termos pela barra vertical '|' e removendo espaços extras
    return posts

  }
}

export default new PostRepository();