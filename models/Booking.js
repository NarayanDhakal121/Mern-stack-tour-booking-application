import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        match: /.+\@.+\..+/, // Validates that a proper email is provided
    },
    tourName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    guestSize: {
        type: Number,
        required: true,
        min: 1, // Assumes there should be at least one guest
    },
    phone: {
        type: String, // Changed to string to preserve leading zeros
        required: true,
    },
    bookAt: {
        type: Date,
        //   required:true
    },
    price: {
        type: Number, // Assuming price is stored as a number
        required: true,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
