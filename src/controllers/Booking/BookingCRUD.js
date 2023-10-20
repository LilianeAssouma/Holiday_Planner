import { Booking } from "../../models/BookingModel.js";
import { tourData } from "../../models/TourModel.js";
import { User } from "../../models/usermodel.js";

export const newBooking = async (req, res) => {
  try {
    const { paymentMethod, tourID, userID } = req.body;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

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
