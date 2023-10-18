import express from "express";
import { login} from "../controllers/authentication/login.js";
import { signup } from "../controllers/authentication/signup.js";

import {changePassword  } from "../controllers/authentication/changePassword.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter =express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);    //removed logger middleware
authRouter.post("/changepassword", verifyToken ,changePassword);
  

export default authRouter; 