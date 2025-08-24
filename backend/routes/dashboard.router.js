import express from "express";
import { getDashboard, logActivity } from "../controllers/dashboard.controller.js";

import { authenticateToken } from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.get("/dashboard", authenticateToken, getDashboard);
router.post("/activity", authenticateToken, logActivity);

export default router;
