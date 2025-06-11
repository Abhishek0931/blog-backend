import express from 'express';
import categoryController from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only admins can create, update, or delete categories
router.post('/category', authenticate, authorizeAdmin, categoryController.create);
router.put('/category/:id', authenticate, authorizeAdmin, categoryController.update);
router.delete('/category/:id', authenticate, authorizeAdmin, categoryController.delete);

// Anyone can view categories
router.get('/categories', categoryController.getAll);
router.get('/category/:id', categoryController.getById);

export default router;