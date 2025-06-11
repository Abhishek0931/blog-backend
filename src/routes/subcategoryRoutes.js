import express from 'express';
import subcategoryController from '../controllers/subcategoryController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only admins can create, update, or delete subcategories
router.post('/subcategory', authenticate, authorizeAdmin, subcategoryController.create);
router.put('/subcategory/:id', authenticate, authorizeAdmin, subcategoryController.update);
router.delete('/subcategory/:id', authenticate, authorizeAdmin, subcategoryController.delete);

// Anyone can view subcategories
router.get('/subcategories', subcategoryController.getAll);
router.get('/subcategory/:id', subcategoryController.getById);

export default router;