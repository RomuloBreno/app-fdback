import { IFollows } from "../../entities/Follows.ts";

export interface IFollowService{
    addFollow(id:string, follower:string): Promise<boolean>;
    removeFollow(id:string, follower:string):Promise<boolean | null | false>;
    getQtdFollow(id:string):Promise<IFollows| null>;
    youFollowMe(followerId:string, followingId: string):Promise<boolean| null>;
}