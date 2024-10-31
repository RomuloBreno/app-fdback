
import { BaseRepository } from './base/BaseRepository.ts';
import Post from '../entities/Post.ts';
import type { IPost } from '../entities/Post.ts';

// repositories/UserRepository.ts
export class PostRepository extends BaseRepository<IPost> {
    constructor() {
        super(Post); // Passa o modelo UserModel para o BaseRepository
    }
}

export default new PostRepository();