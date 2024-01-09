import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js'
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import reviewsRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';
import paymentRoutes from './routes/paymentRoutes.js';
import recommendRoutes from './routes/recommendRoutes.js';
import algoRoutes from './routes/algoRoutes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000',]; 
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, 
};

app.use(cors(corsOptions));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/booking', bookingRoute);
// payment
app.use('/api/v1/payment', paymentRoutes);

//collabrating filtering 
app.use('/api', recommendRoutes);

app.use('/api', algoRoutes);



// Database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected');
  } catch (err) {
    console.error('MongoDB database connection FAILED');
  }
};

// Define routes
app.get('/', (req, res) => {
  res.send('hello its me api');
});

app.listen(port, () => {
  connect()
    .then(() => {
      console.log('Server listening on port', port);
    })
    .catch((err) => {
      console.error('Server startup failed:', err);
    });
});
