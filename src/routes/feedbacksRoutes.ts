import { Router } from 'express';
import FeedbackController from "../controller/FeedbackController.ts";
import { authMiddleware } from '../middleware/AuthMiddleware.ts';

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

// Função para criar o roteador com os WebSocket clients
export const createFeedbackRouter = (clients: WebSocket[]) => {
  
  feedbackRouter.post('/publish-feedback/:postId',authMiddleware, async (req, res) => {
    try {
      req.clients = clients; // Adiciona manualmente os clientes ao objeto de request
      await feedbackController.handle(req, res);
    } catch (error) {
      res.status(404).json({ message: 'service error', error });
    }
  });

  feedbackRouter.get('/feedback/:id', authMiddleware, async (req, res) => {
    try {
      await feedbackController.getById(req, res, req.params.id);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  feedbackRouter.get('/feedbacks/:postId',authMiddleware, async (req, res) => {
    try {
      await feedbackController.getFeedbacksByPostId(req, res, req.params.postId);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  feedbackRouter.get('/feedbacks-feed/:postId',authMiddleware, async (req, res) => {
    try {
      await feedbackController.getFeedbacksWithFilterByPostId(req, res, req.params.postId);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  return feedbackRouter;
};

export default createFeedbackRouter;
