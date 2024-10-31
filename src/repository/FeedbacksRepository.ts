
import { BaseRepository } from './base/BaseRepository.ts';
import Feedback from '../entities/Feedbacks.ts';
import type { IFeedback } from '../entities/Feedbacks.ts';

// repositories/UserRepository.ts
export class FeedbackRepository extends BaseRepository<IFeedback> {
    constructor() {
        super(Feedback); // Passa o modelo UserModel para o BaseRepository
    }
}

export default new FeedbackRepository();