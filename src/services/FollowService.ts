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
    const getQtdFollow = await repository.getQtdFollows(id)
    return getQtdFollow ? getQtdFollow : null 
  }
  async youFollowMe(anotherUserId:string, userId: string): Promise<boolean | null> {
    const FollowRemove = await repository.getById(anotherUserId)
    const findFollower = FollowRemove?.followers.indexOf(userId)
    if(findFollower === -1 || findFollower === undefined)
      return false
    return true 
  }
 
}

export default FollowService;