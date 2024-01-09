import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Review",
        },
    ],
    featured: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
