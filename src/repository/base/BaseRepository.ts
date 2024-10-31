
import { Document, Model } from 'mongoose';
import {connect} from '../../database/mongodb.ts';

// repositories/BaseRepository.ts
export class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        connect();
        this.model = model;
    }

    async getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(item: T): Promise<T> {
        const newItem = new this.model(item);
        return newItem.save();
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
