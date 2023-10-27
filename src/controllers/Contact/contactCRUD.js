import express from "express";
import bodyParser from "body-parser";
import { Contact } from "../../models/contactModel.js";

import nodemailer from "nodemailer";
import { transporter } from "../../utils/Creditentials.js"; 


export const submitForm = async (req, res) => {                                     

  try {

    // if (!email) {
    //   return res.status(400).json({ error: 'Email is required' });
    // }

    // const existingEmail = await Contact.findOne({ email });

    // if (!existingEmail) {
    //   return res.status(401).json({ error: 'Email not found' });
    // }
    const {  message,email } = req.body;
    // const email = req.body.email; 

    console.log(' email:', email);

    const newContact = await Contact.create({  email, message });


   console.log(email);

    const mailOptions = {
      to: newContact.email,
      from: "lilyanassoum@gmail.com" ,
      subject: 'Contact Form Submission',
      text: `Email: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {

    console.error('Form submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// export const submitForm = async (req, res) => {
  
//   try {
//     const { name, email, message, phone } = req.body;
//     if(!email|| !name || !message){
//       return res.status(400).json({error:'Missing required filed'})
//     }
//    const query = 'INSERT INTO contacts(email,name,message) VALUES(?,?,?)'
//    const values = [email, name, message, phone]
//    await Contact.query(query, values)
 

//     res.status(200).json({ message: 'Contact created successfully!' });
 
//     const mailOptions = {
//       from: 'your-email@example.com',
//       to: "lilyanassoum@gmail.com",
//       subject: 'Contact Form Submission',
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     };

//     // Send email using Nodemailer
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email error:', error);
//         res.status(500).json({ message: 'Email sending failed' });
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Form submitted successfully!' });
//       }
//     });
    
//   } catch (error) {
//     console.error('Form submission error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// export const createContact = async (contactData) => {
//   try {
//     const contact = new Contact(contactData);
//     await contact.save();
//     return contact;
//   } catch (error) {
//     throw new Error('Error creating contact');
//   }
// };

// export const getContacts = async () => {
//   try {
//     const contacts = await Contact.find();
//     return contacts;
//   } catch (error) {
//     throw new Error('Error fetching contacts');
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contact = await Contact.findById(contactId);
//     return contact;
//   } catch (error) {
//     throw new Error('Contact not found');
//   }
// };

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
