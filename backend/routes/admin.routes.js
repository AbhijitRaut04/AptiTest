import express from 'express';
import { deleteAdmin, getAllAdmins, loginAdmin, registerAdmin, updateAdminProfile } from '../controllers/admin.controllers.js';
import { upload } from '../middlewares/multer.js';
import imageUpload from '../middlewares/upload.js';

const router = express.Router();
// Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/', getAllAdmins);
router.put('/:id', updateAdminProfile);
router.delete('/:id', deleteAdmin);

export default router;