import type { IPost } from "../../entities/Post.ts";

export interface IPostServices{
    InsertPost(req: Request): Promise<IPost>;
    getById(id:string):Promise<any>;
    getAll():Promise<IPost[]>;
}