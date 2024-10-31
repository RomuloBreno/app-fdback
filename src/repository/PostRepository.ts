
import { BaseRepository } from './BaseRepository.ts';
import Post, { IPost } from '../entities/Post.ts';

// repositories/UserRepository.ts
export class PostRepository extends BaseRepository<IPost> {
    constructor() {
        super(Post); // Passa o modelo UserModel para o BaseRepository
    }
}

export default new PostRepository();