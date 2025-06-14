import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/admin/register', adminController.register);
router.post('/admin/login', adminController.login);

// Add more admin-only routes as needed

export default router;