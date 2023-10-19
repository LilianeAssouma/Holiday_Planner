import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";

import { login} from "../controllers/authentication/login.js";
import { signup } from "../controllers/authentication/signup.js";

import { All, deleteUser } from "../controllers/authentication/CRUD.js";
import {getUserByEmail} from "../controllers/authentication/CRUD.js";
import {updateByEmail} from "../controllers/authentication/CRUD.js";


import {changePassword  } from "../controllers/authentication/changePassword.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter =express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);    //removed logger middleware
authRouter.post("/changepassword", verifyToken ,changePassword);

authRouter.get("/users",All);
authRouter.get('/users/getOne/:email',getUserByEmail);
authRouter.put('/users/update/:email',updateByEmail);
authRouter.delete('/users/delete/:email',verifyToken,isAdmin,deleteUser)

export default authRouter; 