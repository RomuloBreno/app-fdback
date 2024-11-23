import type { ILikeService } from "../interfaces/services/ILikeServices.ts";
import type { ILikes } from "../entities/Likes.ts";
import LikeRepository from "../repository/LikeRepository.ts";

let repository = LikeRepository
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
  async toggleLike(postId: string, liker: string): Promise<boolean> {
    const likedRecord = await repository.getByPost(postId)
    if (!likedRecord) {
      const added = await repository.addLike(postId, liker)
      return added || false
    }

    const validUserLiked = likedRecord?.usersLiked?.includes(liker)
      ? await repository.removeLike(postId, liker)
      : await repository.addLike(postId, liker)

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