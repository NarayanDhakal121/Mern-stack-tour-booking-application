import express from 'express';  // Import express module

const router = express.Router();

// Import the createPayment function from the controller
import { createPayment } from '../controllers/paymentController.js';

// Define routes
router.post('/create-session', createPayment);

export default router;
