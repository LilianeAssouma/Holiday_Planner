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
 *        
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Internal server error.
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
const ContactRouter =express.Router();

import { verifyToken } from "../middleware/verifyToken.js";
import { contactData, deleteContact } from "../controllers/Contact/contactCRUD.js";
import {submitForm} from "../controllers/Contact/contactCRUD.js";
 

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
 *         description: List of contact
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



ContactRouter.delete('/delete/:id',deleteContact);
/**
* @swagger
 * /api/v1/contact/delete/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Delete an existing contact using its ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         schema:
 *           $ref: '#/definitions/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
export default ContactRouter;