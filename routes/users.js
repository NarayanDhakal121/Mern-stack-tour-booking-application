
import express from 'express';
import { createUser, updateUser, getAllUsers, getSingleUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

import { verifyUser , } from '../utils/verifyToken.js';

router.post('/create',  createUser);
router.put('/update/:id',  updateUser);
router.get('/all',  getAllUsers);
router.get('/:id',  getSingleUser);
router.delete('/delete/:id',  deleteUser);




export default router;
