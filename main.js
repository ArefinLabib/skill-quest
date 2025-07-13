import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import userAuthRouter from "./backend/routes/userAuth.router.js";
import userAuthRouter from "./backend/routes/userAuth.router.js";



dotenv.config();
export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userAuthRouter);
// app.use("/api/profile", updateProfile);









app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})