
import { BaseRepository } from './base/BaseRepository.ts';
import Feedback from '../entities/Feedbacks.ts';
import type { IFeedback } from '../entities/Feedbacks.ts';
import mongoose from 'mongoose';

// repositories/UserRepository.ts
export class FeedbackRepository extends BaseRepository<IFeedback> {
    constructor() {
        super(Feedback); // Passa o modelo UserModel para o BaseRepository
    }


    async getAllByPostId(id:string): Promise<IFeedback[]> {
        return this.model.aggregate([
            {
              $match: {
                postId: new mongoose.Types.ObjectId(id),
              }
            },
            {
              $sort: { creationDate: -1 } // Ordena os documentos pela data de criação de forma decrescente
            }
          ]).exec();
          
    }
    async getWithFilterByPostId(id:string): Promise<IFeedback[]> {
      return this.model.aggregate([
        {
            $match: {
                postId: new mongoose.Types.ObjectId(id), // Filtra os documentos pelo `postId`
            },
        },
        {
            $sort: { creationDate: -1 }, // Ordena pela data de criação de forma decrescente
        },
        {
            $limit: 5, // Retorna no máximo 3 registros (para obter do 6º ao 8º)
        },
    ]);
    
          
    }
}

export default new FeedbackRepository();