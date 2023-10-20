
import { Booking } from '../../models/BookingModel.js';
import { User } from "../../models/usermodel.js";


export const newBooking = async(req,res)=>{
  
    try {
        const { paymentMethod } = req.body;

        const tourID = req.body.tourId;
        const userID = req.body.user_id;

        const newBooking = new Booking({
          tourID,
          userID,
          paymentMethod
        });
        
        await newBooking.save();
        res.status(201).json(`Booking ${newBooking} created successfully`); // Return the created booking in the response
      } catch (error) {
        console.log("error",error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  
    