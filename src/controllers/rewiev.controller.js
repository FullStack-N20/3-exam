import Review from '../models/review.model.js';
import { catchError } from '../utils/error-response.js';
import { reviewValidator } from '../validations/review.validation.js';

export class ReviewController {
  async createReview(req, res) {
    try {
      const { error, value } = reviewValidator(req.body);
      if (error) return catchError(res, 400, error);

      const { userId, courseId } = value;
      const existReview = await Review.findOne({ userId, courseId });
      if (existReview)
        return catchError(res, 409, 'You have already reviewed this course');

      const review = await Review.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: review,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getAllReviews(_, res) {
    try {
      const reviews = await Review.find()
        .populate('userId')
        .populate('courseId');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: reviews,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await ReviewController.findById(res, req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: review,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async updateReviewById(req, res) {
    try {
      const { error, value } = reviewValidator(req.body);
      if (error) return catchError(res, 400, error);

      const review = await ReviewController.findById(res, req.params.id);
      if (!review)
        return catchError(res, 404, `Review not found by ID ${req.params.id}`);

      const updatedReview = await Review.findByIdAndUpdate(req.params.id, value, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: updatedReview,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  async deleteReviewById(req, res) {
    try {
      const review = await ReviewController.findById(res, req.params.id);
      await Review.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Review successfully deleted',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }

  static async findById(res, id) {
    try {
      const review = await Review.findById(id)
        .populate('userId')
        .populate('courseId');
      if (!review)
        return catchError(res, 404, `Review not found by ID ${id}`);
      return review;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}

export default ReviewController;
