
import { Document, Model } from 'mongoose';
import { connect } from '../database/mongodb.ts';
import { BaseRepository } from './base/BaseRepository.ts';
import Follows from '../entities/Follows.ts';
import User from '../entities/User.ts';
import type { IFollows } from '../entities/Follows.ts';

// repositories/FollowRepository.ts
export class FollowRepository extends BaseRepository<IFollows> {
    constructor() {
        super(Follows); // Passa o modelo FollowModel para o BaseRepository
    }


    async addFollow(anotherUserId: string, followerId: string): Promise<boolean | null> {
        try {
            // Adiciona o `followerId` ao array `followers` e incrementa `qtdFollowers` do usuário
            await Follows.updateOne(
                { _id: anotherUserId },
                {
                    $addToSet: { followers: followerId }, // Garante que o followerId seja único
                    $inc: { qtdFollowers: 1 }, // Incrementa qtdFollowers
                },
                { upsert: true } // Cria o documento se não existir
            );

            // Adiciona o `anotherUserId` ao array `following` e incrementa `qtdFollowing` do seguidor
            await Follows.updateOne(
                { _id: followerId },
                {
                    $addToSet: { following: anotherUserId }, // Garante que o userId seja único
                    $inc: { qtdFollowing: 1 }, // Incrementa qtdFollowing
                },
                { upsert: true } // Cria o documento se não existir
            );

            return true; // Operação bem-sucedida
        } catch (error) {
            console.error("Erro ao adicionar seguidor:", error);
            return false;
        }
    }
    async removeFollow(anotherUserId: string, followerId: string): Promise<boolean | null> {
          try {
           const getFollowRegisterToRemove =  await Follows.findOne({ _id: anotherUserId }).exec();
            if(!getFollowRegisterToRemove)
                return false
            // Remove o `followerId` do array `followers` e decrementa `qtdFollowers` do usuário
            await Follows.updateOne(
              { _id: anotherUserId },
              {
                $pull: { followers: followerId }, // Remove o followerId do array followers
                $inc: { qtdFollowers: -1 }, // Decrementa qtdFollowers
              }
            );
        
            // Remove o `anotherUserId` do array `following` e decrementa `qtdFollowing` do seguidor
            await Follows.updateOne(
              { _id: followerId },
              {
                $pull: { following: anotherUserId }, // Remove o userId do array following
                $inc: { qtdFollowing: -1 }, // Decrementa qtdFollowing
              }
            );
        
            return true; // Operação bem-sucedida
          } catch (error) {
            console.error("Erro ao remover seguidor:", error);
            return false;
          }
        }
    async getQtdFollows(userId: string): Promise<IFollows | null> {
        return await Follows.findOne({ _id: userId }).select('qtdFollowers qtdFollowing').exec();
    }
    async getFollowers(userId: string): Promise<IFollows | null> {
        return await Follows.findOne({ _id: userId }).select('followers').exec();
    }
    async getFollowing(userId: string): Promise<IFollows | null> {
        return await Follows.findOne({ _id: userId }).select('following').exec();
    }
}

export default new FollowRepository();