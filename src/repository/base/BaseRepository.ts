
import mongoose, { Document, Model } from 'mongoose';

// repositories/BaseRepository.ts
export class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return this.model.aggregate([
            {
              $addFields: {
                creationDate: { $toDate: "$_id" } // Converte o _id para uma data e cria o campo "creationDate"
              }
            },
            {
              $sort: { creationDate: -1 } // Ordena os documentos pela data de criação de forma decrescente
            }
          ]).exec();
          
    }


    async getById(id: string): Promise<T | null> {
        return this.model.findById(id).select('-passwordHash').exec();
    }

    async create(item: T): Promise<T> {
        const newItem = new this.model(item);
        return newItem.save();
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        const { _id, ...updateData } = item.toObject ? item.toObject() : item; // Ignora _id ao copiar

        return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();

    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
