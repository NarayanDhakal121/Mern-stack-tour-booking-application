import  express  from "express" 
import { createsReview } from "../controllers/reviewsControllers.js"
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post('/:tourId', verifyUser, createsReview )

export default router
