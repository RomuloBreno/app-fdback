import { ObjectId } from "mongoose";
import { INotify } from "../../entities/Notify.ts";

export interface INotifyService{
    notifyUser(postId:ObjectId, typeNotify: number, notifier:ObjectId, receiver:ObjectId, clients:WebSocket[]): Promise<INotify | null>;
    insertNotify(notify:INotify):Promise<INotify | null | false>;
    getNotifyByUser(id:string, limit?:number):Promise<INotify[] | null | false>;
    
}