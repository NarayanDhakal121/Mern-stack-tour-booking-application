import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
  
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
