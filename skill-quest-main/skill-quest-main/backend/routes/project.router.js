import express from 'express';
import { getRecommendations } from '../controllers/project.controller.js';
import { authenticateToken } from '../middleware/userAuth.middleware.js';

const router = express.Router();

router.get('/recommendations', authenticateToken, getRecommendations);

export default router;