import express from "express";
import { Contact } from "../../models/contactModel.js";
import { transporter } from "../../utils/Creditentials.js"; 

export const submitForm = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);

    if (!newContact) {
      return res.status(400).json({ message: 'Bad Request - Invalid data' });
    }

    const mailOptions = {
      from: 'lilyanassoum@gmail.com',
      to: newContact.email,
      subject: 'Contact Form Submission',
      text: 'Thank you for reaching out to us!',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Sending email failed:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);

        // Respond to the client
        res.status(201).json({
          message: 'We have received your email and will get back to you as soon as possible.Have a nice day',
          contact: newContact,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteContact = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
