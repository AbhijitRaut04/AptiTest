import express from 'express';
import { deleteUser, getAllUsers, loginUser, registerUser, updateUserProfile } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/upload.js';

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', updateUserProfile);
router.delete('/:id', deleteUser);

export default router;