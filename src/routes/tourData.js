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


tourNewsRouter.post('/create',uploaded,addGallery);

tourNewsRouter.put('/update',updateMany);

tourNewsRouter.delete('/delete/:id',deleteOne);
tourNewsRouter.delete('/deleteall',deleteAll);

tourNewsRouter.put('/update',oneUpdated);


export default tourNewsRouter;