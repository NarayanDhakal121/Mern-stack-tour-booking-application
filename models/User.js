// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     isAdmin: Boolean,
    
//     role: {
//         type: String,
//       },
// });

// export default mongoose.model('User', userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

export default mongoose.model('User', userSchema);
