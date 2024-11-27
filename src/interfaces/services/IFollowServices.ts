import { IFollows } from "../../entities/Follows.ts";
import { IUser } from "../../entities/User.ts";

export interface IFollowService{
    addFollow(id:string, follower:string): Promise<boolean>;
    removeFollow(id:string, follower:string):Promise<boolean | null | false>;
    getQtdFollow(id:string):Promise<IFollows| null>;
    getFollowersByUser(id:string):Promise<IUser[]| null | false>;
    getFollowingByUser(id:string):Promise<IUser[]| null | false>;
    youFollowMe(followerId:string, followingId: string):Promise<boolean| null>;
}