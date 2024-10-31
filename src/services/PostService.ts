import type { IPost } from "../entities/Post.ts";
import Post from "../entities/Post.ts";
import type { IPostServices } from "../interfaces/services/IPostServices.ts";
import PostRepository from "../repository/PostRepository.ts";
import mongoose from "mongoose";

let repository = PostRepository
class PostService implements IPostServices {
    // Método para exibir informações do usuário
    public async InsertPost(req: Request): Promise<IPost> {
        let post = new Post(req.body);
        return await repository.create(post);
    }
    public async getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            return false
        let result = await repository.getById(id)
        return result
    }
}

export default PostService;