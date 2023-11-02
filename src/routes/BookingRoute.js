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
 *         date:
 *           type: string
 *         format: date
 *         status:
 *           type: string
 *         numberOfTickets:
 *           type: integer
 *       
 */


import express from "express";

const BookingNewsRouter = express.Router();

import { newBooking, updateBooking } from "../controllers/Booking/BookingCRUD.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { BookAll } from "../controllers/Booking/BookingCRUD.js";
import { getOneBooking } from "../controllers/Booking/BookingCRUD.js";
import { isAdmin } from "../middleware/isAdmin.js";

BookingNewsRouter.post('/create',verifyToken,newBooking);
/**
 * @swagger
 * /api/v1/booking/create:
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Booking
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tourID:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 * 
 *               paymentMethod:
 *                 type: string
 *               status:
 *                 type: string
 *               numberOfTickets:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking successfully created
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *
 *
 * 
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


BookingNewsRouter.put('/update/:id',updateBooking);
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