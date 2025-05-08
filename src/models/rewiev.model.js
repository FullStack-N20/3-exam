import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    rating: {
      type: String,
      enum: ['1', '2', '3', '4', '5'],
      required: true,
    },
    comment: { type: String },
  },
  { timestamps: true }
);

export const Review = model('Review', reviewSchema);
export default Review;
