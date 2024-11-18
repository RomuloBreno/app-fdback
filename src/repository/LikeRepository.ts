import { BaseRepository } from './base/BaseRepository.ts';
import Likes from '../entities/Likes.ts';
import type { ILikes } from '../entities/Likes.ts';

// repositories/FollowRepository.ts
export class LikeRepository extends BaseRepository<ILikes> {
  [x: string]: any;
  constructor() {
    super(Likes);
  }


  async addLike(postId: string, userId: string): Promise<boolean | null> {
    try {
      await Likes.updateOne(
        { postRefer: postId },
        {
          $addToSet: { usersLiked: userId },
          $inc: { qtdLikes: 1 },
        },
        { upsert: true } // Cria o documento se não existir
      );

      return true; // Operação bem-sucedida
    }
    catch (error) {
      console.error("Erro ao adicionar seguidor:", error);
      return false;
    }
  }

  async removeLike(postId: string, userId: string): Promise<boolean | null> {
    try {
      await Likes.updateOne(
        { postRefer: postId },
        {
          $pull: { usersLiked: userId }, 
          $inc: { qtdLikes: -1 },
        }
      );
      return true; // Operação bem-sucedida
    }
    catch (error) {
      console.error("Erro ao adicionar seguidor:", error);
      return false;
    }
  }
  async getQtdLikes(postId: string): Promise<ILikes | null> {
    return await Likes.findOne({ postRefer: postId }).select('-usersLiked -postRefer').exec();
  }
  async getByPost(postId: string): Promise<ILikes | null> {
    return await Likes.findOne({ postRefer: postId }).exec();
  }
}

export default new LikeRepository();