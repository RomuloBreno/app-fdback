import type { ILikeService } from "../interfaces/services/ILikeServices.ts";
import type { ILikes } from "../entities/Likes.ts";
import type { IPost } from "../entities/Post.ts";
import Post from "../entities/Post.ts";
import LikeRepository from "../repository/LikeRepository.ts";

import NotifyService from "../services/NotifyService.ts";
import mongoose from "mongoose";

let repository = LikeRepository

let serviceNotify = new NotifyService()
class LikeService implements ILikeService {
  async youLikedPost(postId: string, userId: string): Promise<boolean | null> {
    if(!postId)
      return false
    const likedPost = await repository.getByPost(postId)
    const findFollower = likedPost?.usersLiked?.includes(userId)
    if(!findFollower)
      return false
    return true 
  }
  async toggleLike(postId: string, liker: string, clients:WebSocket[]): Promise<boolean> {
    const likedRecord = await repository.getByPost(postId)
    const postRecord: IPost | null = await Post.findOne({_id: postId}).exec()
    const postConvertId = new mongoose.Types.ObjectId(String(postId))
    const postOwner = new mongoose.Types.ObjectId(String(postRecord?.owner))
    if (!likedRecord) {
      const added = await repository.addLike(postId, liker)
      const notifierId= new mongoose.Types.ObjectId(liker);
      if(postRecord)
         serviceNotify.notifyUser(1, notifierId, postOwner, clients, postConvertId)
      return added || false
    }
    
    const validUserLiked = likedRecord?.usersLiked?.includes(liker)
    ? await repository.removeLike(postId, liker)
    : await repository.addLike(postId, liker)

      const notifierId = new mongoose.Types.ObjectId(liker);
      if(postRecord && !likedRecord?.usersLiked?.includes(liker))
         serviceNotify.notifyUser(1, notifierId, postOwner, clients, postConvertId)
    return validUserLiked || false
  }
  async getQtdLike(id: string): Promise<number | null> {
    if(!id)
      return null
    const getQtdLike = await repository.getQtdLikes(id)
    return getQtdLike ? getQtdLike.qtdLikes : null
  }


}

export default LikeService;