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
 *         description: Tour not found
 *       
 *       500:
 *         description: Internal server error
 *        
 */
tourNewsRouter.post('/create',uploaded,addGallery);
/**
 * @swagger
 * /api/v1/tour/create:
 *   post:
 *     summary: Add a new tour with image gallery
 *     tags:
 *       - Tours
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Tour details with images
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               backdropImage:
 *                 type: file
 *                 format: binary
 *                 description: Backdrop image for the tour (Required)
 *               Gallery:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                   description: List of images for the tour gallery (Required)
 *               destination:
 *                 type: string
 *                 description: Destination of the tour (Optional)
 *               Title:
 *                 type: string
 *                 description: Title of the tour (Optional)
 *               Description:
 *                 type: string
 *                 description: Description of the tour (Optional)
 *               Duration:
 *                 type: string
 *                 description: Duration of the tour (Optional)
 *               GroupSize:
 *                 type: string
 *                 description: Size of the tour group (Optional)
 *               Price:
 *                 type: string
 *                 description: Price of the tour (Optional)
 *               Discount:
 *                 type: string
 *                 description: Discount for the tour (Optional)
 *               TourType:
 *                 type: string
 *                 description: Type of the tour (Optional)
 *               Departure:
 *                 type: string
 *                 description: Departure of the tour (Optional)
 *               Seats:
 *                 type: string
 *                 description: Number of seats available (Optional)
 *               fromMonth:
 *                 type: string
 *                 description: Starting month of the tour (Optional)
 *               toMonth:
 *                 type: string
 *                 description: Ending month of the tour (Optional)
 *               departureTime:
 *                 type: string
 *                 description: Departure time of the tour (Optional)
 *               ReturnTime:
 *                 type: string
 *                 description: Return time of the tour (Optional)
 *     responses:
 *       201:
 *         description: Tour created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 tourDetails:
 *                   $ref: '#/components/schemas/tourData'
 *             example:
 *               message: Tours created
 *               tourDetails:
 *                 destination: Example Destination
 *                 Title: Example Tour
 *                 Description: Example Description
 *                 Duration: Example Duration
 *                 GroupSize: Example Group Size
 *                 Price: Example Price
 *                 Discount: Example Discount
 *                 TourType: Example Tour Type
 *                 Departure: Example Departure
 *                 Seats: Example Seats
 *                 fromMonth: Example Start Month
 *                 toMonth: Example End Month
 *                 departureTime: Example Departure Time
 *                 ReturnTime: Example Return Time
 *                 backdropImage: Example Backdrop Image URL
 *                 Gallery:
 *                   - Example Image URL 1
 *                   - Example Image URL 2
 *       400:
 *         description: Bad request, missing required parameters
 *       401:
 *         description: Unauthorized, missing or invalid authentication token
 *       409:
 *         description: Conflict, tour creation failed
 *       500:
 *         description: Internal server error
 */

tourNewsRouter.put('/update',uploaded, updateMany);
/**
 * @swagger
 * /api/v1/tour/update:
 *   put:
 *     summary: Update a tour
 *     tags: [Tours]
 *     description: Update an existing tour.
 *     parameters:
 *       - in: query
 *         name: fieldName
 *         schema:
 *           type: string
 *         required: true
 *         description: The field name to identify the tour to update (e.g., "_id" or "destination").
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: The value of the field to match when identifying the tour.
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *             destination:
 *              type: string
 *             backdropImage:
 *                 type: file
 *                 format: binary
 *                 description: Backdrop image for the tour (Required)
 *             Title:
 *              type: string
 *             Description:
 *              type: string
 *             Duration:
 *              type: string
 *             Group_size:
 *              type: string
 *             Price:
 *              type: string
 *             Discount:
 *              type: string
 *             Tour_type:
 *              type: string
 *             Departure:
 *              type: string
 *             Seats:
 *              type: integer
 *             fromMonth:
 *              type: string
 *             toMonth:
 *              type: string
 *             departureTime:
 *              type: string
 *             ReturnTime:
 *              type: string
 *             Gallery:
 *              type: array
 *              items:
 *                type: file
 *                format: binary
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found or update failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

tourNewsRouter.put('/updates',uploaded,oneUpdated);


export default tourNewsRouter;