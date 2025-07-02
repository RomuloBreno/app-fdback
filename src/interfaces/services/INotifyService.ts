import { Types } from "mongoose";
import type { INotify } from "../../entities/Notify";

export interface INotifyService{
    notifyUser(typeNotify: number, notifier:Types.ObjectId, receiver:Types.ObjectId, clients:WebSocket[], postId?:Types.ObjectId): Promise<INotify | null>;
    insertNotify(notify:INotify):Promise<INotify | null | false>;
    getNotifyByUser(id:string, limit?:number):Promise<INotify[] | null | false>;
    
}