import express from 'express';
import { createTour, deleteTour, updateTour, getSingleTour,getAllTour, getTourBySearch, getFeaturedTour , getTourCount} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';



const router= express.Router();

//create new tour 

router.post('/',  createTour);

//update tour
router.put('/:id',   updateTour);

//delete tour
router.delete('/:id',   deleteTour);

//get single tour
router.get('/:id',  getSingleTour);

//create new tour
router.get('/', getAllTour);
// get tour by search
router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getFeaturedTours', getFeaturedTour);

router.get('/search/getTourCount', getTourCount);

export default router;