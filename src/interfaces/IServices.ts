import type { IFeedbacks } from "../entities/Feedbacks.ts";
import type { IPost } from "../entities/Post.ts";
import type { IUser } from "../entities/User.ts";

export interface IServices{
    InsertUser(req: Request): Promise<IUser>;
    InsertPost(req: Request): Promise<IPost>;
    InsertFeedback(req: any, res: any):Promise<IFeedbacks>
}