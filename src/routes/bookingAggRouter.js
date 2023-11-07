import express from "express";

 import {getBookingsCount} from "../controllers/Booking/numberOfBooking.js";

const bookingCountRouter = express.Router();
  
 bookingCountRouter.get('/count',getBookingsCount);
/**
 * @swagger
 *   /api/v1/count:
 *     get:
 *       summary: Get the number of bookings made in a specific year
 *       tags:
 *         - Booking
 *       parameters:
 *         - name: year
 *           in: query
 *           description: Year for which bookings are to be counted
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Number of bookings made in the specified year
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       description: The month name (e.g., January, February, etc.)
 *                     count:
 *                       type: integer
 *                       description: Number of bookings made in the specific month
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