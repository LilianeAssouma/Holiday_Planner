import { Contact } from "../../models/contactModel.js";
import nodemailer from "nodemailer";
import { transporter } from "../../utils/Creditentials.js"; 


export const submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save form data to the database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notification
    const mailOptions = {
      from: user.email,
      to: "lilyanassoum@gmail.com" ,
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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


