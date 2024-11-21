import { ILikes } from "../../entities/Likes.ts";

export interface ILikeService{
    toggleLike(postId:string, liker:string): Promise<boolean>;
    getQtdLike(postId:string):Promise<number| null>;
    youLikedPost(postId:string, userId:string):Promise<boolean| null>;
}