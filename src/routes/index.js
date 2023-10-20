import express from "express";
import authRouter from "./authentication.js";
import tourNewsRouter from "./tourData.js";
import BookingNewsRouter from "./BookingRoute.js"



const mainRouter = express.Router();

// models
mainRouter.use("/auth",authRouter);
mainRouter.use("/tour",tourNewsRouter);
mainRouter.use("/booking",BookingNewsRouter);

export default mainRouter;