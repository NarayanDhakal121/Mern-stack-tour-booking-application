import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour', // This should be the name of your Product model


    },
    username: {
        type: String,
        required: true,
           },

    reviewText: {
        type: String,
        required: true,
           },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0 
    },
  

}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
