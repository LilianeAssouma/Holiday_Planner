
import { Mongoose } from "mongoose";
import { Booking } from "../../models/BookingModel.js";
import { tourData } from "../../models/TourModel.js";
import { User } from "../../models/usermodel.js";
import nodemailer from "nodemailer";
import { transporter } from "../../utils/Creditentials.js"; 

export const newBooking = async (req, res) => {

   try {
    const { paymentMethod, tourID } = req.body;
   let userID= req.userId;

    const userIdObject = mongoose.Types.ObjectId(userID);
    console.log("User ID:",userIdObject);
    const user = await User.findById(userIdObject);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    console.log("Tour ID:", tourID);
   const tour = await tourData.findById(tourID); // Find the tour and user based on their IDs

    if (!tour) {
      return res.status(404).json({ message: "Tour  not found" });
    }
    const newBooking = new Booking({
      tourID: tour._id, //saving tour ID
      userID: user._id,
      paymentMethod,
    });
    // console.log("tourID:", tour);
    // console.log("userID:", user);

const mailOptions = {
        from: "lilyanassoum@gmail.com",
        to: user.email,
        subject: "Booking Confirmation Message",
        text: `Hello ${user.fullName},\n\nBooking successfully created! Thank you for booking with us.`,
      };

      console.log("Before sending email"); 
      await transporter.sendMail(mailOptions, (error,info)=>{
        if (error) {
          console.log('email sending failed',error);
        } else {
          console.log('email sent ',info.response);
        }
      }); // Await the sending of the email
      console.log("After sending email");

    await newBooking.save();
    res
      .status(201)
      .json({ 
        message:"Booking successfully created",
        user: user,
        // Booking: newBooking,
        tour: tour,
            
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all booking details
export const BookAll = async(req,res)=>{
  try {
    let BookData = await Booking.find();
    res.status(200).json(BookData ); 

  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

//get one booking details
export const getOneBooking = async (req, res) => {                        //read by element instead of reading by id
  
  try {
    const id = req.params.id;
    let BookData = await Booking.findById(id);

    if (!BookData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(BookData);
  } catch (error) {
    console.error("error",error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}