import express from "express";

import initiatePayment from "../controllers/payment/paymentMethod.js";
 const payRouter = express.Router();

 payRouter.post('/payment',initiatePayment);

 export default payRouter;