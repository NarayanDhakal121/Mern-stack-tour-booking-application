// routes/recommendRoutes.js
import express from 'express';
import {getTopRatedTours} from '../controllers/recommendController.js';


const router = express.Router();


router.get('/topRatedTours', getTopRatedTours);



export default router;
