/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/contact/submit:
 *   post:
 *     summary: Form
 *     tags: [Contact]
 *     description: Contact form submission.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email
 *               message:
 *                 type: string
 *                 description: Message
 *             required:
 *               - email
 *               - message
 *     responses:
 *       200:
 *         description: Form submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating the form submission was successful.
 *       404:
 *         description: Contact not found.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorContactNotFound'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorInternalServer'
 *
 *   ErrorContactNotFound:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 *         description: Error message indicating the contact was not found.
 *
 *   ErrorInternalServer:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message indicating an internal server error occurred during form submission.
 */



import express from "express";

import {submitForm} from "../controllers/Contact/contactCRUD.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { contactData } from "../controllers/Contact/contactCRUD.js";

 const ContactRouter =express.Router();

 ContactRouter.post('/submit',submitForm);

 ContactRouter.get('/',contactData);
/**
 * @swagger
 * /api/v1/contact:
 *   get:
 *     summary: Contact details
 *     tags: 
 *       - Contact
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                   $ref: '#/components/schemas/Contact'
 *       
 *       409:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, the user does not have permission
 *       500:
 *         description: Internal server error
 * 
 */

 export default ContactRouter;