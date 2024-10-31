
import { Document, Model } from 'mongoose';
import {connect} from '../database/mongodb.ts';
import { BaseRepository } from './BaseRepository.ts';
import User, { IUser } from '../entities/User.ts';

// repositories/UserRepository.ts
export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User); // Passa o modelo UserModel para o BaseRepository
    }
}

export default new UserRepository();