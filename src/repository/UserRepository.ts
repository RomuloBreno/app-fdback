
import { Document, Model } from 'mongoose';
import {connect} from '../database/mongodb.ts';
import { BaseRepository } from './base/BaseRepository.ts';
import User from '../entities/User.ts';
import type { IUser } from '../entities/User.ts';

// repositories/UserRepository.ts
export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User); // Passa o modelo UserModel para o BaseRepository
    }

    async getByNick(nick: string): Promise<IUser | null> {
        return await User.findOne({ nick: nick }).select('-passwordHash').exec();
    }
    async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email: email }).select('-passwordHash').exec();
    }
}

export default new UserRepository();