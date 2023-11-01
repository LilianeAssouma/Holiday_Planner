import { Booking } from "../../models/BookingModel.js";
import { tourData } from "../../models/TourModel.js";
import { User } from "../../models/usermodel.js";


export const newBooking = async (req, res) => {
  try {
    const { paymentMethod,tourID, date, status, numberOfTickets, isPaid } = req.body;
    const userID = req.userId;

    const user = await User.findById(userID);

    // if (!user) {
    //   return res.status(404).json({
    //     message: "User not found",
    //   });
    // };
 
    //const {tourID} = req.params;
     const tour = await tourData.findById(tourID);
    console.log(`Tour ID: ${tourID}`);

    // if (!tour) {
    //   return res.status(404).json({ message: "Tour not found" });
    // }

    const newBooking = new Booking({
      tourID,
      userID,
      date,
      status,
      numberOfTickets,
      isPaid,
      paymentMethod
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking successfully created",
      user: user,
      tour: tour,
      booking: newBooking,
    });
  } catch (error) {
    console.error("error", error);
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
      return res.status(404).json({ error: 'BookingTour not found' });
    }

    res.status(200).json(BookData);
  } catch (error) {
    console.error("error",error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}