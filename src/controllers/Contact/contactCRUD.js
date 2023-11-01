import express from "express";
import bodyParser from "body-parser";
import { Contact } from "../../models/contactModel.js";

import nodemailer from "nodemailer";
import { transporter } from "../../utils/Creditentials.js"; 






// export const submitForm = async (req, res) => { 
//   try {
//     const { email, message } = req.body;

//     // Validate request data
//     if (!email || !message) {
//       return res.status(400).json({ message: 'Email and message are required fields' });
//     }

//     // Create a new contact instance
//     const newContact = new Contact({
//       email,
//       message,
//     });

//     // Save the contact information to the database
//     await newContact.save();

//     return res.status(201).json({ message: 'Contact information successfully saved' });
//   } catch (error) {
//     console.error('Error saving contact information:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }



export const submitForm = async (req, res) => {                                     

  try {

//     // if (!email) {
//     //   return res.status(400).json({ error: 'Email is required' });
//     // }

//     // const existingEmail = await Contact.findOne({ email });

//     // if (!existingEmail) {
//     //   return res.status(401).json({ error: 'Email not found' });
//     // }
//     const {  message } = req.body;
//     const email = req.body.email; 

//     console.log(' email:', email);

//     const newContact = await Contact.create({  email, message });


//    console.log(email);

//     const mailOptions = {
//       to: newContact.email,
//       from: "lilyanassoum@gmail.com" ,
//       subject: 'Contact Form Submission',
//       text: `Email: ${email}\nMessage: ${message}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email error:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {

    console.error('Error saving contact information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





//   try {
//     const contacts = await Contact.find();
//     return contacts;
//   } catch (error) {
//     throw new Error('Error fetching contacts');
//   }


// export const updateContact = async (contactId, updatedContactData) => {
//   try {
//     const contact = await Contact.findByIdAndUpdate(contactId, updatedContactData, {
//       new: true,
//     });
//     if (!contact) {
//       throw new Error('Contact not found');
//     }
//     return contact;
//   } catch (error) {
//     throw new Error('Error updating contact');
//   }
// };

// export const deleteContact = async (contactId) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(contactId);
//     if (!contact) {
//       throw new Error('Contact not found');
//     }
//     return contact;
//   } catch (error) {
//     throw new Error('Error deleting contact');
//   }
// };

export const contactData = async(req,res)=>{
  try {
    let Data = await Contact.find();
    res.status(200).json(Data ); 

  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}
