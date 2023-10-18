import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";

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



tourNewsRouter.get('/view',getAll);
tourNewsRouter.get('/getone/:id',getOne)
tourNewsRouter.get('/getElement',getElement)

tourNewsRouter.post('/add',uploaded,addnew);
tourNewsRouter.post('/addmany',addMany);
tourNewsRouter.patch('/update/:id',updateOne);
tourNewsRouter.patch('/updateall/',updateMany)
tourNewsRouter.delete('/delete/:id',deleteOne);
tourNewsRouter.delete('/deteteall',deleteAll);

export default tourNewsRouter;