
import { BaseRepository } from './base/BaseRepository.ts';
import User from '../entities/User.ts';
import type { IPostStory } from '../entities/PostStory.ts';
import type { IUser } from '../entities/User.ts';
import PostStory from '../entities/PostStory.ts';
import mongoose from 'mongoose';

// repositories/UserRepository.ts
export class PostStoryRepository extends BaseRepository<IPostStory> {
    constructor() {
        super(PostStory); // Passa o modelo UserModel para o BaseRepository
    }
    
    async getAllByOwner(id:string, limit?:number): Promise<IPostStory[]> {
        return this.model.aggregate([
          // Adiciona o campo "creationDate" baseado no ObjectId
          {
              $addFields: {
                  creationDate: { $toDate: "$_id" }, // Converte o _id para uma data
              },
          },
          // Filtra pelo campo _id
          {
              $match: {
                  owner: new mongoose.Types.ObjectId(id), // Certifique-se de converter o `id` se necessário
              },
          },
          // Ordena os resultados pela "creationDate" de forma decrescente
          {
              $sort: { creationDate: -1 },
          },
          // Limita o número de documentos retornados
          {
              $limit: limit || 100, // Ajuste o valor conforme necessário
          },
      ]).exec();
      
          
    }
}

export default new PostStoryRepository();