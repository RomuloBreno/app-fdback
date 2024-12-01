import { Router } from 'express';
import FeedbackController from "../controller/FeedbackController.ts";
import { authMiddleware } from '../middleware/AuthMiddleware.ts';

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

// Função para criar o roteador com os WebSocket clients
export const createFeedbackRouter = (clients: WebSocket[]) => {
  
  feedbackRouter.post('/publish-feedback/:postId',authMiddleware, async (req:any, res) => {
      req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
      await feedbackController.handle(req, res);
  });

  feedbackRouter.get('/feedback/:id', authMiddleware, async (req, res) => {
      await feedbackController.getById(req, res, req.params.id);
  });

  feedbackRouter.get('/feedbacks/:postId',authMiddleware, async (req, res) => {
      await feedbackController.getFeedbacksByPostId(req, res, req.params.postId);

  });

  feedbackRouter.get('/feedbacks-feed/:postId',authMiddleware, async (req, res) => {
      await feedbackController.getFeedbacksWithFilterByPostId(req, res, req.params.postId);
  });

  return feedbackRouter;
};

export default createFeedbackRouter;
