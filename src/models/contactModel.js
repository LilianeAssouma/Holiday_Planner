import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
 
  email: {
    type: String
  },
 
  message: {
    type: String
  },
});

export const Contact = mongoose.model('Contact', contactSchema);


