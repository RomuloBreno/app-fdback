import type { IPost } from "../entities/Post.ts";
import type { IPostStory } from "../entities/PostStory.ts";
import Post from "../entities/Post.ts";
import PostStory from "../entities/PostStory.ts";
import type { IPostServices } from "../interfaces/services/IPostServices.ts";
import PostRepository from "../repository/PostRepository.ts";
import PostStoryRepository from "../repository/PostStoryRepository.ts";
import mongoose from "mongoose";

let repository = PostRepository
let repositoryPostStory = PostStoryRepository
class PostService implements IPostServices {
    //UNUSED
    public async InsertPostStory(req: any): Promise<IPostStory> {
        let postStory = new PostStory(req.body);
        return await repositoryPostStory.create(postStory);
    }
    public async getPostsByFollowing(userId:string, limit?:number): Promise<IPost[] | null> {
        let posts: IPost[] | null = []
        const getPostsByFollowing: IPost[] | null=  await repository.getPostsByFollowing(userId, limit);
        const getPostsByjob: IPost[] | null =  await repository.getPostsByJob(userId, limit);
        const getLastPostByUser: (IPost | null )[]=  await repository.getPostsByUser(userId, 1);
        const getPostByAll: IPost[] | null =  await repository.getAll();
        // getPostsByjob?.map((e)=>{
        //     posts.push(e)
        // })
        // getPostsByFollowing?.map((e)=>{
        //     if(posts.indexOf(e) === -1)
        //         posts.push(e)
        // })
        // getLastPostByUser?.map((e)=>{
        //     if(e){
        //         if(posts.indexOf(e) === -1)
        //             posts.push(e)
        //     }
        // })
        getPostByAll?.map((e)=>{
            if(posts.indexOf(e) === -1)
                posts.push(e)
        })
        return posts
    }
    public async getPostsByStoryPosts(postStory:string): Promise<(IPost | null)[]> {
        let postsArr: (IPost | null)[] = await repository.getPostsByPostStory(postStory);
        let postsByPostStoryWithCreatedDate: (IPost | null)[] = await Promise.all(
            postsArr.map((post)=>{
                const creationDate = new Date((post?._id as mongoose.Types.ObjectId)?.getTimestamp());
                return { ...post?.toObject(), creationDate };
                }) || []
            )
        
        return postsByPostStoryWithCreatedDate
    }
    public async InsertPost(req: any): Promise<IPost> {
        const postStoryPattern = req.body.postStoryPattern
        let PostStoryCreatedOrUpdated;
        let post = new Post(req.body);
        let postCreated =  await repository.create(post);
  
            // Verifica se o padrão `postStoryPattern` é válido
            if (postStoryPattern !== undefined) {
                if(postStoryPattern){
                    // Busca o PostStory existente pelo padrão
                    const existingPostStory = await PostStory.findOne({ _id: postStoryPattern }).exec();
                    
                    // Adiciona o ID do post criado ao PostStory encontrado
                    existingPostStory?.postStory?.push(postCreated?.id);
                    existingPostStory?.save();
                    PostStoryCreatedOrUpdated = existingPostStory
                } else {
                // Inicializa um novo PostStory com os dados da requisição
                let postStory = new PostStory(req.body);
                // Adiciona o ID do post criado ao array `postStory`
                postStory.postStory?.push(postCreated?.id);
                // Cria um novo PostStory caso o padrão não seja fornecido
                PostStoryCreatedOrUpdated = await repositoryPostStory.create(postStory);
            }
        }
        
            postCreated.postStoryPattern = PostStoryCreatedOrUpdated?.id;
        
            // Salva as alterações no repositório de posts
            postCreated.save()
        
        return postCreated
    }
    public async getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            return false
        let result = await repository.getById(id)
        const creationDate = new Date((result?._id as mongoose.Types.ObjectId)?.getTimestamp());
        return { ...result?.toObject(), creationDate };
    }
    public async getPostsByUser(id: string, limit?:number) : Promise<(IPost | null)[] | false>{
        if (!mongoose.Types.ObjectId.isValid(id))
            return false
        let postsArr: (IPost | null)[] = await repository.getPostsByUser(id, limit)
        let postsByUserId: any = await Promise.all(
            postsArr.map((post)=>{
                const creationDate = new Date((post?._id as mongoose.Types.ObjectId)?.getTimestamp());
                return { ...post, creationDate };
                }) || []
            )
        return postsByUserId;
    }
    public async getAll() : Promise<IPost[]>{
        let result = await repository.getAll()
        return result
    }
    public async getPostsStorybyOwner(ownerId:string) : Promise<IPostStory[]>{
        let result = await repositoryPostStory.getAllByOwner(ownerId)
        return result
    }
}

export default PostService;