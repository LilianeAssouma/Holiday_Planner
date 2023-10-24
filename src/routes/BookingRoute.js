/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         tourID:
 *           type: string
 *         userID:
 *           type: string
 *         isPaid:
 *           type: string
 *         paymentMethod:
 *           type: string
 *       
 */


import express from "express";

const BookingNewsRouter = express.Router();

import { newBooking } from "../controllers/Booking/BookingCRUD.js";
import { verifyToken } from "../middleware/verifyToken.js";


BookingNewsRouter.post('/create',newBooking);
/**
 * @swagger
 *   /api/v1/booking/create:
 *     post:
 *       summary: Create a new booking
 *       tags:
 *         - Booking
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: Booking details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tourID:
 *                   type: string
 *                 userID:
 *                   type: string
 *                 isPaid:
 *                   type: boolean
 *                 paymentMethod:
 *                   type: string
 *               example:
 *                 tourID: "653768cb34bea818ffa336c3"
 *                 userID: "18ffa336c3"
 *                 isPaid: false
 *                 paymentMethod: "Credit"
 *       responses:
 *         201:
 *           description: Booking created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     $ref: '#/components/schemas/Booking'
 *               example:
 *                 message: "Booking created successfully"
 *                 tourDetails:
 *                   tourID: "653768cb34bea818ffa336c3"
 *                   userID: "18ffa336c3"
 *                   isPaid: false
 *                   paymentMethod: "Credit"
 *         400:
 *           description: Bad request, missing required parameters
 *           content:
 *             application/json:
 *               example:
 *                 message: "Bad request, missing required parameters"
 *         401:
 *           description: Unauthorized, missing or invalid authentication token
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized, missing or invalid authentication token"
 *         409:
 *           description: Conflict, tour creation failed
 *           content:
 *             application/json:
 *               example:
 *                 message: "Conflict, tour creation failed"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error"
 */


export default BookingNewsRouter;