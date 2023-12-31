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
 *     summary: Change Password
 *     tags:
 *       - Authentication
 *     description: Change the password of an authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *          schema:
 *           type: object
 *           properties:
 *             currentPassword:
 *               type: string
 *               description: Current password of the user.
 *             newPassword:
 *               type: string
 *               description: New password to set for the user.
 *           required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       400:
 *         description: Bad Request - Invalid data
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
 * /api/v1/auth/users/update/{id}:
 *   put:
 *     summary: Update user by Id
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing User by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /api/v1/auth/users/delete/{id}:
 *  delete:
 *     summary: Delete user by Id
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

import { login } from "../controllers/authentication/login.js";
import { signup } from "../controllers/authentication/signup.js";

import { All, deleteUser } from "../controllers/authentication/CRUD.js";
import { getUserByAny } from "../controllers/authentication/CRUD.js";
import { updateById } from "../controllers/authentication/CRUD.js";

import { changePassword } from "../controllers/authentication/changePassword.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploaded } from "../middleware/multer.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup); //removed logger middleware
authRouter.post("/changepassword", verifyToken, uploaded, changePassword);

authRouter.get("/users", All);
authRouter.get("/users/getOne", getUserByAny);
authRouter.put("/users/update/:id", uploaded,updateById);
authRouter.delete("/users/delete/:id", deleteUser);

//handling Invalid url routes
authRouter.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Invalid endpoint. Please check your request.",
  });
});

export default authRouter;
