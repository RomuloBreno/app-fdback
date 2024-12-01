import NotifyRepository from "../repository/NotifyRepository.ts";
import dotenv from "dotenv";
import { INotifyService } from '../interfaces/services/INotifyService.ts';
import { INotify } from '../entities/Notify.ts';
import {ENotify} from '../enums/ENotify.ts';
import Notify from '../entities/Notify.ts';
import { ObjectId } from 'mongoose';

dotenv.config()

let repository = NotifyRepository

class NotifyService implements INotifyService {
  public async notifyUser(postId:ObjectId, typeNotify: number, notifier:ObjectId, receiver:ObjectId, clients:WebSocket[]): Promise<INotify | null> {
    const message = ENotify[typeNotify]
    const data = {
      notifier,
      receiver,
      message,
      postId
    }
    let notify = new Notify(data);
    this.notify(clients, data, receiver.toString())
    return this.insertNotify(notify)
  }
  public async  insertNotify(notify: INotify): Promise<INotify | null> {
    return repository.create(notify) || null
  }
  public async  getNotifyByUser(id: string, limit?: number): Promise<INotify[] | null> {
    return repository.getNotifyByUser(id, limit)
  }

private async notify(clientsReq:any, dataNotify:any, userId:string) {
  const clients: any = clientsReq; // Recupera os clients anexados no middleware
  console.log('notify: ' + dataNotify?.message)
  if (userId){
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN ) {
        if (client.userId === dataNotify.userId ){
        client.send(
        JSON.stringify(dataNotify)
      );
    }
    }
  });
} 
}

}
export default NotifyService;
