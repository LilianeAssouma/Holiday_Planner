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





tourNewsRouter.get('/',getAll);
tourNewsRouter.get('/getone/:id',getOne)
tourNewsRouter.get('/getElement',getElement)

tourNewsRouter.post('/create',uploaded,verifyToken,isAdmin,addnew);
tourNewsRouter.post('/addmany',uploaded,isAdmin,addMany);
tourNewsRouter.patch('/update/:id',updateOne);
tourNewsRouter.patch('/updateall/:id',updateMany)
tourNewsRouter.delete('/delete/:id',deleteOne);
tourNewsRouter.delete('/deleteall',verifyToken,isAdmin,deleteAll);



export default tourNewsRouter;