import express from "express";
import bodyParser from "body-parser";
import { Contact } from "../../models/contactModel.js";


import { transporter } from "../../utils/Creditentials.js"; 



export const submitForm = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);

    if (!newContact) {
      return res.status(400).json({ message: 'Bad Request - Invalid data' });
    }

    console.log('Recipient Email:', newContact.email);

    // Send a welcome email to the user
    const mailOptions = {
        to: newContact.email,
        from: "lilyanassoum@gmail.com" ,
        subject: 'Contact Form Submission',
        text: `Email: ${email}\nMessage: ${message}`,
      };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);

        // Respond to the client
        res.status(201).json({
          message: 'Message sent successfully',
          contact: newContact,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};








// export const submitForm = async (req, res) => {                                     

//   try {

//     // if (!email) {
//     //   return res.status(400).json({ error: 'Email is required' });
//     // }

//     // const existingEmail = await Contact.findOne({ email });

//     // if (!existingEmail) {
//     //   return res.status(401).json({ error: 'Email not found' });
//     // }
  //   const {  message } = req.body;
  //   const email = req.body.email; 

  //   console.log(' email:', email);

  //   const newContact = await Contact.create({  email, message });


  //  console.log(email);

    // const mailOptions = {
    //   to: newContact.email,
    //   from: "lilyanassoum@gmail.com" ,
    //   subject: 'Contact Form Submission',
    //   text: `Email: ${email}\nMessage: ${message}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error('Email error:', error);
    //   } else {
    //     console.log('Email sent:', info.response);
    //   }
    // });

//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };








// export const updateContact = async () => {

//     const { contactId } = req.params;
//     const updatedContactData = req.body;
  
//     try {
//       const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedContactData, { new: true });
//       if (!updatedContact) {
//         return res.status(404).json({ error: 'Contact not found' });
//       }
//       res.status(200).json(updatedContact);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error updating contact' });
//     }
//   };
  

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

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
