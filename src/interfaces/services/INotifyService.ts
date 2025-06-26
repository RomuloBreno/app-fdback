import { ObjectId } from "mongoose";
import type { INotify } from "../../entities/Notify";

export interface INotifyService{
    notifyUser(typeNotify: number, notifier:ObjectId, receiver:ObjectId, clients:WebSocket[], postId?:ObjectId): Promise<INotify | null>;
    insertNotify(notify:INotify):Promise<INotify | null | false>;
    getNotifyByUser(id:string, limit?:number):Promise<INotify[] | null | false>;
    
}