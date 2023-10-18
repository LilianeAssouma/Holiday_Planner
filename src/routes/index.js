import express from "express";
import authRouter from "./authentication.js";
import tourNewsRouter from "./tourData.js";



const mainRouter = express.Router();

// models
mainRouter.use("/auth",authRouter);
mainRouter.use("/tour",tourNewsRouter);

export default mainRouter;