
import Tour from "../models/Tour.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

export const createsReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body});

  
    const id = tourId;
    if (mongoose.Types.ObjectId.isValid(id)) {
        console.log('The id is a valid ObjectId');
    } else {
        console.log('The id is not a valid ObjectId');
    }

    try {
        const savedReview = await newReview.save();

        if (!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(400).json({ success: false, message: 'Invalid tourId' });
        }


        // After creating a new review, update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id },
        });

        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to submit review', error: err.toString() });
    }
};

