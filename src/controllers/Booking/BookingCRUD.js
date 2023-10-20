
import { Booking } from '../../models/BookingModel.js';
import { tourData } from '../../models/TourModel.js';
import { User } from "../../models/usermodel.js";



export const newBooking = async(req,res)=>{
  
    try {
      const { paymentMethod, tourId, userId } = req.body;

      const tour = await tourData.findById(tourId);                 // Find the tour and user based on their IDs
      const user = await User.findById(userId);

      
    if (!tour || !user) {
      return res.status(404).json({ error: 'Tour or User not found' });             // Check if tour and user exist
    }
        const newBooking = new Booking({
          tourID: tour._id,          //saving tour ID
          userID: user._id, 
          paymentMethod
        });
        
        await newBooking.save();
        res.status(201).json(`Booking ${newBooking} created successfully`); // Return the created booking in the response
      } catch (error) {
        console.log("error",error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  
    