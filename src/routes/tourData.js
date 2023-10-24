/**
* @swagger
* components:
*   schemas:
*     tourData:
*       type: object
*       properties:
*         destination:
*           type: string
*           description: Destination of the tour.
*         backdropImage:
*           type: string
*           description: URL of the backdrop image
*         Title:
*           type: string
*           description:  Title of the tour
*         Description:
*           type: string
*           description:  Description of the tour
*         Duration:
*           type: string
*           description:  Duration of the tour
*         GroupSize:
*           type: string
*           description:  size of the tour group
*         Price:
*           type: string
*           description:  Price of the tour 
*         Discount:
*           type: string
*           description:  Discount for the tour
*         TourType:
*           type: string
*           description:  Type of the tour
*         Departure:
*           type: string
*           description:  Departure of the tour
*         Seats:
*           type: string
*           description:  Number of seats available
*         fromMonth:
*           type: string
*           description:  Starting month of the tour 
*         toMonth:
*           type: string
*           description:  Ending month of the tour 
*         departureTime:
*           type: string
*           description:  Departure time of the tour 
*         ReturnTime:
*           type: string
*           description:  Return time of the tour 
*         Gallery:
*           type: array
*           items:
*             type: string
*             description:  list of image URLs in the tour gallery
*/
/**
 * @swagger
 * /api/v1/tour:
 *   get:
 *     summary: Get all tour data
 *     tags:
 *       - Tours
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tour data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TourData'
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tour/getElement:
 *   get:
 *     summary: Get tour value
 *     tags: 
 *       - Tours
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *            type: string
 *         required: true
 *         description: The field to search by (e.g., email or id)
 *       - in: query
 *         name: value
 *         schema:
 *            type: string
 *         
 *         required: true
 *         description: The value of the field to search for
 *     responses:
 *       200:
 *         description: Tour found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/tourData'
 *            
 *       401:
 *         description: User not found
 *       
 *       500:
 *         description: Internal server error
 *        
 */


import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const tourNewsRouter = express.Router();

import { getAll } from "../controllers/tour/Read.js";
import { getOne } from "../controllers/tour/Read.js";
import { getElement } from "../controllers/tour/Read.js";


import { addGallery} from "../controllers/tour/Create.js";

import { updateMany } from "../controllers/tour/Update.js";

import { deleteOne } from "../controllers/tour/Delete.js";
import { deleteAll } from "../controllers/tour/Delete.js";
import { oneUpdated } from "../controllers/tour/Update.js";

import { uploaded } from "../middleware/multer.js";






tourNewsRouter.get('/',getAll);
tourNewsRouter.get('/getone/:id',getOne)
tourNewsRouter.get('/getElement',getElement)
/**
 * @swagger
 * /api/v1/tour/addGallery:
 *   post:
 *     summary: Add a new tour with image gallery
 *     tags:
 *       - Tours
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               backdropImage:
 *                 type: string
 *                 format: binary
 *               Gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Tour created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Tour created successfully"
 *       400:
 *         description: Bad request, missing required parameters or invalid file format
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       409:
 *         description: Conflict, tour creation failed
 *       500:
 *         description: Internal server error
 */
 

tourNewsRouter.post('/create',uploaded,addGallery);

tourNewsRouter.put('/update',updateMany);
/**
 * @swagger
 * /api/v1/tour/updateMany:
 *   put:
 *     summary: Update multiple tour elements based on a specific field
 *     tags:
 *       - Tours
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the field to filter the elements.
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: The value to match against the specified field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Object containing fields to be updated
 *     responses:
 *       200:
 *         description: Tour elements updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Updated tour elements
 *             example:
 *               updatedField: "newValue"
 *       400:
 *         description: Bad request, missing required parameters or invalid request body
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       404:
 *         description: Not found, no tour elements matching the provided criteria
 *       500:
 *         description: Internal server error
 */

tourNewsRouter.delete('/delete/:id',deleteOne);

tourNewsRouter.delete('/deleteall',deleteAll);
/**
 * @swagger
 * /api/v1/tour/deleteAll:
 *   delete:
 *     summary: Delete multiple tour elements based on a specific field
 *     tags:
 *       - Tours
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the field to filter the elements.
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: The value to match against the specified field.
 *     responses:
 *       200:
 *         description: Tour elements deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 deletedCount:
 *                   type: integer
 *                   description: Number of deleted tour elements
 *             example:
 *               message: "Tour elements deleted successfully"
 *               deletedCount: 5
 *       400:
 *         description: Bad request, missing required parameters
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       404:
 *         description: Not found, no tour elements matching the provided criteria
 *       500:
 *         description: Internal server error
 */

tourNewsRouter.put('/update',oneUpdated);


export default tourNewsRouter;