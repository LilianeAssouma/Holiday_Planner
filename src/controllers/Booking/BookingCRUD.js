import { Booking } from "../../models/BookingModel.js";
import { tourData } from "../../models/TourModel.js";
import { User } from "../../models/usermodel.js";
import { transporter } from "../../utils/Creditentials.js";

export const newBooking = async (req, res) => {
  const { paymentMethod, tourID, date, status, numberOfTickets } = req.body;
  const userID = req.userId;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log("userId", userID);

    const tour = await tourData.findById(tourID);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    console.log("tourId", tourID);

    const newBooking = new Booking({
      tourID: tour._id,
      userID: user._id,
      date,
      status,
      numberOfTickets,
      isPaid: false,
      paymentMethod
    });

    // const mailOptions = {
    //   from: "lilyanassoum@gmail.com",
    //   to: user.email,
    //   subject: "Booking Confirmation Message",
    //   text: `Hello ${user.fullName},\n\nBooking successfully created! Thank you for booking with us.`,
    // };

    // console.log("Before sending email");
    // await transporter.sendMail(mailOptions); // Removed the callback, since you're using async/await
    // console.log("After sending email");

    await newBooking.save();

    res.status(201).json({
      message: "Booking successfully created",
      user: user,
      tour: tour,
      //booking: newBooking,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all booking details
export const BookAll = async (req, res) => {
  try {
    let BookData = await Booking.find();
    res.status(200).json(BookData);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};


export const getOneBooking = async (req, res) => {

  try {
    const id = req.params.id;
    let BookData = await Booking.findById(id);

    if (!BookData) {
      return res.status(404).json({ error: "BookingTour not found" });
    }

    res.status(200).json(BookData);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update
export const updateBooking = async (req, res) => {
  const { id } = req.params; 
  const { status, numberOfTickets, isPaid, paymentMethod } = req.body; 

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status,
        numberOfTickets,
        isPaid,
        paymentMethod,
      },
      { new: true } 
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



