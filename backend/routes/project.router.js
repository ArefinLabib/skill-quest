import express from 'express';
import { getRecommendations, enrollInProject, getUserProjects } from '../controllers/project.controller.js';
import { authenticateToken } from '../middleware/userAuth.middleware.js';


const router = express.Router();

router.get('/recommendations', authenticateToken, getRecommendations);
router.post('/:projectId/enroll', authenticateToken, enrollInProject);
router.get("/my-projects", authenticateToken, getUserProjects);

export default router;