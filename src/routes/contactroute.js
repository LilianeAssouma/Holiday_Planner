import express from "express";

import {submitForm} from "../controllers/Contact/contactCRUD.js";

 const ContactRouter =express.Router();

 ContactRouter.post('/submit',submitForm);

 export default ContactRouter;