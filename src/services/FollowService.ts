import type { IFollowService } from "../interfaces/services/IFollowServices.ts";
import type { IFollows } from "../entities/Follows.ts";
import FollowRepository from "../repository/FollowRepository.ts";
import UserRepository from "../repository/UserRepository.ts";
import mongoose from "mongoose";
import type { IUser } from "../entities/User.ts";

let repository = FollowRepository
let repositoryUser = UserRepository
class FollowService implements IFollowService {
 async getFollowersByUser(id: string): Promise<IUser[] | null | false> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let followRecord: IFollows | null = await repository.getFollowers(id)
    let usersByFollower: IUser[] | null = await Promise.all(
      followRecord?.followers?.map(async (follower) => {
        let user = await repositoryUser.getById(follower);
        return { ...user?.toObject(), user };
      }) || []
    )
    return usersByFollower
  }
 async getFollowingByUser(id: string): Promise<IUser[] | null | false> {
    if (!mongoose.Types.ObjectId.isValid(id))
      return false
    let followRecord: IFollows | null = await repository.getFollowing(id)
    let usersByFollower: IUser[] | null = await Promise.all(
      followRecord?.following?.map(async (following) => {
        let user = await repositoryUser.getById(following);
        return { ...user?.toObject()};
      }) || []
    )
    return usersByFollower
  }
  async addFollow(id: string, follower: string): Promise<boolean> {
    const FollowAdd = await repository.addFollow(id, follower)
    return FollowAdd ? FollowAdd : false
  }
  async removeFollow(id: string, follower: string): Promise<boolean | null | false> {
    const FollowRemove = await repository.removeFollow(id, follower)
    return FollowRemove ? FollowRemove : false
  }
  async getQtdFollow(id: string): Promise<IFollows | null> {
    const getQtdFollow = await repository.getQtdFollows(id)
    return getQtdFollow ? getQtdFollow : null
  }
  async youFollowMe(anotherUserId: string, userId: string): Promise<boolean | null> {
    const FollowRemove = await repository.getById(anotherUserId)
    const findFollower = FollowRemove?.followers.indexOf(userId)
    if (findFollower === -1 || findFollower === undefined)
      return false
    return true
  }

}

export default FollowService;