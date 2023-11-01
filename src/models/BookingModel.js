import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tourID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tourData',                     // Tour model 
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                              //  the User model
    required: true
  },
  Date: {
   type:String 
  },
Status:{
  type:String ,
  default: false
},
NumberOfTicket:{
  type:String  
},
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    String
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);

