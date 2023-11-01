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
  
  whoBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  tourBooked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tourData', 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending'
  },
  numberOfTickets: {
    type: Number,
    required: true
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

