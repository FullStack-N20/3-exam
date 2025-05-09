import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard.js';
import { AdminGuard } from '../middlewares/admin.guard.js';

const router = Router();
const controller = new ReviewController();

router
  .post('/', JwtAuthGuard, controller.createReview)
  .get('/', JwtAuthGuard, controller.getAllReviews)
  .get('/:id', JwtAuthGuard, AdminGuard, controller.getReviewById)
  .put('/:id', JwtAuthGuard, AdminGuard, controller.updateReviewById)
  .delete('/:id', JwtAuthGuard, AdminGuard, controller.deleteReviewById);

export default router;
