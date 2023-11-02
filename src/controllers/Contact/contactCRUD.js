import express from "express";
import { Contact } from "../../models/contactModel.js";
import { transporter } from "../../utils/Creditentials.js"; 


export const submitForm = async (req, res) => {
  try {
    const { email, message } = req.body;

    const newContact = await Contact.create({email:email, message:message });
    
    const mailOptions = {
      to: email,
      from: "lilyanassoum@gmail.com",
      subject: 'Contact Form Submission',
      text: `Email: ${email}\nMessage: ${message}`,
    };

    // Use async/await with the sendMail function
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);

    await newContact.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Invalid input. Please check your email and message.' });
    } else {
      console.log('error',error);
      res.status(500).json({ message: 'Internal server error.' });
    }
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
//     const {  message,email } = req.body;
//     //const email = req.body.email; 

//     console.log(' email:', email);

//     const newContact = await Contact.create({  email, message });

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

//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//   console.error('Form submission error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


  

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
