import type { IPost } from "../../entities/Post.ts";
import type { IPostStory } from "../../entities/PostStory.ts";

export interface IPostServices{
    InsertPost(req: any): Promise<IPost>;
    InsertPostStory(req: any): Promise<IPostStory>
    getById(id:string):Promise<any>;
    getAll():Promise<IPost[]>;
    getPostsByFollowing(userId:string, limit?:number):Promise<IPost[] | null>;
    getPostsByUser(userId:string, limit?:number):Promise<(IPost | null)[] | false>;
    getPostsByStoryPosts(postStory:string): Promise<(IPost | null)[]>
    getPostsStorybyOwner(ownerId:string) : Promise<IPostStory[]>
}