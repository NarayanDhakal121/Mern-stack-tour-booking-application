// backend/routes/recommendRoutes.js
import express from 'express';
import { yml } from '../controllers/algorithm.js';

const router = express.Router();

router.get('/yml',yml);

export default router;
