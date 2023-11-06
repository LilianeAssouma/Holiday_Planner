import express from "express";

 import {getBookingsCountInMonth} from "../controllers/Booking/numberOfBooking.js";

const bookingCountRouter = express.Router();
  
 bookingCountRouter.get('/count',getBookingsCountInMonth);
/**
 * @swagger
 *   /api/v1/count:
 *     get:
 *       summary: Get the number of bookings made in a specific month
 *       tags:
 *         - Booking
 *       parameters:
 *         - name: year
 *           in: query
 *           description: Year of the month
 *           required: true
 *           schema:
 *             type: integer
 *         - name: month
 *           in: query
 *           description: Month (1-12)
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Number of bookings made in the specified month
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   bookings:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The month in YYYY-MM format
 *                         month:
 *                           type: string
 *                           description: The month abbreviation (e.g., Jan, Feb, etc.)
 *                         count:
 *                           type: integer
 *                           description: Number of bookings made in the specific month
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */


  

  


 export default bookingCountRouter;