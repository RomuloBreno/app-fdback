import { Router } from 'express'
import FeedbackController from "../controller/FeedbackController.ts"
import { authMiddleware } from '../middleware/AuthMiddleware.ts'

// import { rateLimiter } from '../middleware/RateLimit.ts';
const feedbackRouter = Router()
let feedbackController = new FeedbackController()

feedbackRouter.post('/publish-feedback/:postId', authMiddleware, feedbackController.handle);

feedbackRouter.get('/feedback/:id', authMiddleware, async (req: any, res: any) => {
  feedbackController.getById(req, res, req.params.id)
});

feedbackRouter.get('/feedbacks/:postId', authMiddleware, async (req: any, res: any) => {
  feedbackController.getFeedbacksByPostId(req, res, req.params.postId)
});
feedbackRouter.get('/feedbacks-feed/:postId', authMiddleware, async (req: any, res: any) => {
  feedbackController.getFeedbacksWithFilterByPostId(req, res, req.params.postId)
});


export { feedbackRouter }


