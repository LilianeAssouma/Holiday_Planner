import mongoose from "mongoose";
const tourSchema = mongoose.Schema({
  destination: String,
  backdropImage: {type:String,require:true},
  Title: {type:String,require:true},
  Description: String,
  Duration: String,
  GroupSize: String,
  Price: String,
  Discount: String,
  TourType: String,
  Departure: String,
  Seats: String,            // seats: Number,        
  fromMonth: String,
  toMonth: String,
  departureTime: String,
  Returntime: String,
  Gallery: [Array],             // gallery: [String]
 
});
export const tourData = mongoose.model("tourData", tourSchema);
