import express from 'express';
import userController from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken);

// Protected routes
router.get('/profile', authenticate, userController.getProfile);
router.get('/users', authenticate, authorizeAdmin, userController.getAllUsers);
router.get('/users/:id', authenticate, authorizeAdmin, userController.getUserById);
router.put('/users/:id', authenticate, upload.single('profilePic'), userController.updateUser);
router.delete('/users/:id', authenticate, authorizeAdmin, userController.deleteUser);

router.post('/upload-profile-pic', authenticate, upload.single('profilePic'), userController.updateUser);

export default router;