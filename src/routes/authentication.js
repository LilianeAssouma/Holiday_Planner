/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         fullName:
 *           type: string
 *         location:
 *           type: string
 *       
 */
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               message: User registered successfully
 *               access_token: jwt.token.here
 *               user:
 *                 email: user@example.com
 *                 fullName: Tom Jerry
 *                 location: Las Vegas
 *                 role: user
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       description: User creditentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               message: User logged in successfully
 *               access_token: jwt.token.here
 *               user:
 *                 email: user@example.com
 *                 fullName: Tom Jerry
 *                 location: Las Vegas
 *                 role: user
 *       401:
 *         description: Wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Wrong password
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/changepassword:
 *   post:
 *     summary: Change user password
 *     tags: 
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User creditentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               message: Password changed successfully
 *               access_token: jwt.token.here
 *               user:
 *                 email: user@example.com
 *                 fullName: Tom Jerry
 *                 location: Las Vegas
 *                 role: user
 *       401:
 *         description: Wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Wrong password
 *       
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: 
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#/components/schemas/User'
 *       
 *       409:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, the user does not have permission
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /api/v1/auth/users/getOne:
 *   get:
 *     summary: Get user by field value
 *     tags: 
 *       - Authentication
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
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *            
 *       401:
 *         description: User not found
 *       
 *       500:
 *         description: Internal server error
 *        
 */

/**
 * @swagger
 * /api/v1/auth/users/update/{email}:
 *   put:
 *     summary: Update user by email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Updated user object
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/users/delete/{id}:
 *  delete:
 *     summary: Delete user by id
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the user to delete
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: User deleted successfully
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       409:
 *         description: Internal server error
 */
import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";

import { login} from "../controllers/authentication/login.js";
import { signup } from "../controllers/authentication/signup.js";

import { All, deleteUser } from "../controllers/authentication/CRUD.js";
import {getUserByAny} from "../controllers/authentication/CRUD.js";
import {updateById} from "../controllers/authentication/CRUD.js";


import {changePassword  } from "../controllers/authentication/changePassword.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter =express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);    //removed logger middleware
authRouter.post("/changepassword", verifyToken ,changePassword);

authRouter.get("/users",verifyToken,isAdmin,All);
authRouter.get('/users/getOne',getUserByAny);
authRouter.put('/users/update/:id',updateById);
authRouter.delete('/users/delete/:id',verifyToken,deleteUser)

export default authRouter; 

