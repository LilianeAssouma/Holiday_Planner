import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const tourNewsRouter = express.Router();

import { getAll } from "../controllers/tour/Read.js";
import { getOne } from "../controllers/tour/Read.js";
import { getElement } from "../controllers/tour/Read.js";

import { addnew} from "../controllers/tour/Create.js";
import { addMany} from "../controllers/tour/Create.js";
import { updateOne } from "../controllers/tour/Update.js";
import { updateMany } from "../controllers/tour/Update.js";
import { deleteOne } from "../controllers/tour/Delete.js";
import { deleteAll } from "../controllers/tour/Delete.js";
import { uploaded } from "../middleware/multer.js";




tourNewsRouter.get('/view',verifyToken,isAdmin,getAll);
tourNewsRouter.get('/getone/:id',verifyToken,isAdmin,getOne)
tourNewsRouter.get('/getElement',verifyToken,isAdmin,getElement)

tourNewsRouter.post('/add',uploaded,verifyToken,isAdmin,addnew);
tourNewsRouter.post('/addmany',uploaded,isAdmin,addMany);
tourNewsRouter.patch('/update/:id',isAdmin,updateOne);
tourNewsRouter.patch('/updateall/',isAdmin,updateMany)
tourNewsRouter.delete('/delete/:id',isAdmin,deleteOne);
tourNewsRouter.delete('/deteteall',isAdmin,deleteAll);

export default tourNewsRouter;