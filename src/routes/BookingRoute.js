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
import { BookAll } from "../controllers/Booking/BookingCRUD.js";
import { getOneBooking } from "../controllers/Booking/BookingCRUD.js";
import { isAdmin } from "../middleware/isAdmin.js";

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

BookingNewsRouter.get('/view',BookAll);
/**
 * @swagger
 * /api/v1/booking/view:
 *   get:
 *     summary: Get booking details
 *     tags: 
 *       - Booking
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Booking list
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                   $ref: '#/components/schemas/Booking'
 *       
 *       409:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, the user does not have permission
 *       500:
 *         description: Internal server error
 * 
 */

BookingNewsRouter.get('/:id',getOneBooking);
/**
 * @swagger
 * /api/v1/booking/{id}:
 *   get:
 *     summary: GetOne 
 *     tags: 
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         
 *     responses:
 *       200:
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Booking'
 *            
 *       401:
 *         description: Booking not found
 *       
 *       500:
 *         description: Internal server error
 *         
 *        
 */

export default BookingNewsRouter;