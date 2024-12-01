
import { BaseRepository } from './base/BaseRepository.ts';
import Notify from '../entities/Notify.ts';
import type { INotify } from '../entities/Notify.ts';
import mongoose from 'mongoose';

// repositories/UserRepository.ts
export class NotifyRepository extends BaseRepository<INotify> {
    constructor() {
        super(Notify); // Passa o modelo UserModel para o BaseRepository
    }
    async getNotifyByUser(userId: string, limit?: number): Promise<INotify[] | null> {
        const notify: INotify[] | null = await Notify.aggregate([
            // Filtra os documentos pelo campo "owner"
            {
              $addFields: {
                creationDate: { $toDate: "$_id" } // Converte o _id para uma data
              }
            },
            {
                $match: {
                    receiver: new mongoose.Types.ObjectId(userId), // Certifique-se de converter o userId se necessário
                },
            },
            // Ordena os documentos por ordem de criação decrescente (_id implícito)
            {
                $sort: { _id: -1 },
            },
            // Limita a quantidade de resultados
            {
                $limit: limit || 30, // Defina o número máximo de documentos a serem retornados
            },
        ]).exec();
        
          // Dividindo os termos pela barra vertical '|' e removendo espaços extras
          return notify
    }
}

export default new NotifyRepository();