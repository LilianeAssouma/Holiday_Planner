import express from "express";
import authRouter from "./authentication.js";
import tourNewsRouter from "./tourData.js";
import BookingNewsRouter from "./BookingRoute.js"
import ContactRouter from "./contactroute.js";



const mainRouter = express.Router();

// models
mainRouter.use("/auth",authRouter);
mainRouter.use("/tour",tourNewsRouter);
mainRouter.use("/booking",BookingNewsRouter);
mainRouter.use("/contact",ContactRouter);

export default mainRouter;