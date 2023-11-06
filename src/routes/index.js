import express from "express";
import authRouter from "./authentication.js";
import tourNewsRouter from "./tourData.js";
import BookingNewsRouter from "./BookingRoute.js"
import ContactRouter from "./contactroute.js";

import bookingCountRouter from "./bookingAggRouter.js";
import payRouter from "./paymentRouter.js";


const mainRouter = express.Router();

// models
mainRouter.use("/auth",authRouter);
mainRouter.use("/tour",tourNewsRouter);
mainRouter.use("/booking",BookingNewsRouter);
mainRouter.use("/contact",ContactRouter);

mainRouter.use("/",bookingCountRouter);
mainRouter.use("/",payRouter);

export default mainRouter;