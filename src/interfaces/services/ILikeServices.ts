import { ILikes } from "../../entities/Likes.ts";

export interface ILikeService{
    toggleLike(postId:string, liker:string, clientes:WebSocket[]): Promise<boolean>;
    getQtdLike(postId:string):Promise<number| null>;
    youLikedPost(postId:string, userId:string):Promise<boolean| null>;
}