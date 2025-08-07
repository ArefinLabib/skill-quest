import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userAuthRouter from "./backend/routes/userAuth.router.js";
import goalsSkillRouter from "./backend/routes/goalsSkill.router.js";
import projectRouter from "./backend/routes/project.router.js";



dotenv.config();
export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userAuthRouter);
app.use("/api", goalsSkillRouter);
app.use("/api/projects", projectRouter);
// app.use("/api/profile", updateProfile);









app.listen(process.env.PORT || 1648, () => {
    console.log(`Server is running on port ${process.env.PORT || 1648}`);
})