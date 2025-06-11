import express from 'express';
import blogPostController from '../controllers/blogPostController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Only authenticated users can create blog posts
router.post('/blogpost', authenticate, upload.single('coverImage'), blogPostController.create);

// Only the author or admin can update/delete (add logic in controller if needed)
router.put('/blogpost/:id', authenticate, blogPostController.update);
router.delete('/blogpost/:id', authenticate, blogPostController.delete);

// Anyone can view blog posts
router.get('/blogposts', blogPostController.getAll);
router.get('/blogpost/:id', blogPostController.getById);

// Search blog posts by title (public)
router.get('/blogposts/search', blogPostController.search);

// get blog by id and increment view count
router.get('/blogpost/:id', blogPostController.getById);

// Like, dislike, and report blog posts (only authenticated users)
router.post('/blogpost/:id/like', authenticate, blogPostController.like);
router.post('/blogpost/:id/dislike', authenticate, blogPostController.dislike);
router.post('/blogpost/:id/report', authenticate, blogPostController.report);

export default router;