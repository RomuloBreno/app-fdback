import type { IPost } from "../entities/Post.ts";
import type{ IPostServices } from "../interfaces/IPostServices.ts";
import Post  from "../entities/Post.ts";
import { BaseRepository } from "../repository/BaseRepository.ts";

let baseRepository: BaseRepository<IPost> = new BaseRepository(Post);
class PostService implements IPostServices {
   // Método para exibir informações do usuário
    public async InsertPost(req: Request):Promise<IPost>{
        let post = new Post(req.body);
        return await baseRepository.create(post);
    }
    public async getById(id: string){
        let result = await baseRepository.getById(id)
        return result
      }
}

export default PostService;