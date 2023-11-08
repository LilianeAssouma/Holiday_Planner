
/**
 * @swagger
 * components:
 *   schemas:
 *     CashInResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         data:
 *           type: object
 *           description: Data response from Paypack API
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */
import { cashIn, cashOut, transactions } from "../controllers/payment/paypack.js";

const express = require("express");

const paymentRouter = express.Router();

paymentRouter.post("/cashin", cashIn);

/**
 * @swagger
 * /api/v1/payment/cashin:
 *   post:
 *     summary: Perform cash-in operation
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number for cash-in
 *               amount:
 *                 type: number
 *                 description: Amount for cash-in
 *             example:
 *               number: "07xxxxxxx"
 *               amount: 100
 *     responses:
 *       200:
 *         description: Cash-in operation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashInResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
paymentRouter.post("/cashout",cashOut);
/**
 * @swagger
 * /api/v1/payment/cashout:
 *   post:
 *     summary: Perform cash-out operation
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: Phone number for cash-in
 *               amount:
 *                 type: number
 *                 description: Amount for cash-in
 *             example:
 *               number: "07xxxxxxx"
 *               amount: 100
 *     responses:
 *       200:
 *         description: Cash-out operation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashOutResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

paymentRouter.get("/trans",transactions);
/**
 * @swagger
 * /api/v1/payment/trans:
 *   get:
 *     summary: Perform cash-transaction operation
 *     tags: [Payment]
 *    
 *     responses:
 *       200:
 *         description: Cash-transaction operation successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashTransactionResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export default paymentRouter;



