
import { BaseRepository } from './base/BaseRepository.ts';
import Logger from '../entities/logger/Logger.ts';
import type { ILogger } from '../entities/logger/Logger.ts';

// repositories/UserRepository.ts
export class LoggerRepository extends BaseRepository<ILogger> {
    constructor() {
        super(Logger); // Passa o modelo UserModel para o BaseRepository
    }
}

export default new LoggerRepository();