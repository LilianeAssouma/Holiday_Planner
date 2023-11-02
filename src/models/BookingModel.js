import mongoose from "mongoose";
 
const bookingSchema = new mongoose.Schema({
  tourID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tourData',                     // Tour model 
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullname: String,  
  email: String,
  confirmEmail: String,
  phone: String,
  date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending'
  },
  numberOfTickets: {
    type: Number
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

