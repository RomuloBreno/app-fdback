import type { IFollowService } from "../interfaces/services/IFollowServices.ts";
import type { IFollows } from "../entities/Follows.ts";
import FollowRepository from "../repository/FollowRepository.ts";
import mongoose from "mongoose";

let repository = FollowRepository
class FollowService implements IFollowService {
  async addFollow(id:string, follower:string): Promise<boolean> {
    const FollowAdd = await repository.addFollow(id,follower)
    return FollowAdd ? FollowAdd : false 
  }
  async removeFollow(id: string, follower:string): Promise<boolean | null | false> {
    const FollowRemove = await repository.removeFollow(id,follower)
    return FollowRemove ? FollowRemove : false 
  }
  async getQtdFollow(id: string): Promise<IFollows | null> {
    const FollowRemove = await repository.getQtdFollows(id)
    return FollowRemove 
  }
 
}

export default FollowService;