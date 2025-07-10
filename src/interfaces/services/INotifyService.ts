import mongoose, { Types } from "mongoose";
import type { INotify } from "../../entities/Notify";

export interface INotifyService{
    notifyUser(typeNotify: number, notifier:mongoose.Schema.Types.ObjectId, receiver:mongoose.Schema.Types.ObjectId, clients:WebSocket[], postId?:mongoose.Schema.Types.ObjectId): Promise<INotify | null>;
    insertNotify(notify:INotify):Promise<INotify | null | false>;
    getNotifyByUser(id:string, limit?:number):Promise<INotify[] | null | false>;
    
}