import mongoose from "mongoose";
const tourSchema = mongoose.Schema({
  destination: String,
  backdropImage: String,
  Title: {type:String,require:true},
  Description: String,
  Duration: String,
  GroupSize: String,
  Price: String,
  DiscountPercentage: String,
  TourType: String,
  Departure: String,
  Seats: String,
  fromMonth: String,
  toMonth: String,
  departureTime: String,
  Returntime: String,
  Gallery: String,
 
});
export const tourData = mongoose.model("tourData", tourSchema);
