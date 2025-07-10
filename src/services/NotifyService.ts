import NotifyRepository from "../repository/NotifyRepository.ts";
import dotenv from "dotenv";
import type { INotifyService } from '../interfaces/services/INotifyService.ts';
import type { INotify } from '../entities/Notify.ts';
import { ENotify } from '../enums/ENotify.ts';
import Notify from '../entities/Notify.ts';
import mongoose, { Types } from 'mongoose';

dotenv.config()

let repository = NotifyRepository

class NotifyService implements INotifyService {
  public async notifyUser(typeNotify: number, notifier: mongoose.Schema.Types.ObjectId, receiver: mongoose.Schema.Types.ObjectId, clients: WebSocket[], postId?: mongoose.Schema.Types.ObjectId): Promise<INotify | null> {
    const message = ENotify[typeNotify]
    const data = {
      notifier,
      receiver,
      message: typeNotify,
      postId: postId
    }
    let notify = new Notify(data);
    const notifyCreated = this.insertNotify(notify)

    if (
      notifier &&
      receiver &&
      notifier.toString() !== receiver.toString()
    ) {
      this.notify(clients, data, receiver.toString(), message)
    }
    return notifyCreated
  }
  public async insertNotify(notify: INotify): Promise<INotify | null> {
    return repository.create(notify) || null
  }
  public async getNotifyByUser(id: string, limit?: number): Promise<INotify[] | null> {
    return repository.getNotifyByUser(id, limit)
  }

  private async notify(clientsReq: any, dataNotify: any, userId: string, messageString: string) {
    const clients: WebSocket[] = clientsReq; // Recupera os clients anexados no middleware
    if (userId && clients.length > 0) {
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          if ((client as any).userId === userId) {
            dataNotify.message = messageString
            client.send(
              JSON.stringify(dataNotify)
            );
          }
        } else {
          console.log("none user connect")
        }
      });
    }
  }

}
export default NotifyService;
