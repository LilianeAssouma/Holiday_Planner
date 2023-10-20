import express from "express";


const BookingNewsRouter = express.Router();

import { newBooking } from "../controllers/Booking/BookingCRUD.js";
import { verifyToken } from "../middleware/verifyToken.js";


BookingNewsRouter.post('/create',newBooking);


export default BookingNewsRouter;