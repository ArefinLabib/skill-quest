// routes/userProjects.router.js
import express from "express";
import { enrollInProject } from "../controllers/userProjects.controller.js";
import { authenticateToken } from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.post("/enroll", authenticateToken, enrollInProject);

export default router;
