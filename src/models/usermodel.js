import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  email: { type: String, required: true,unique:true},
  fullName: String,
  password: { type: String, required: true },
  phone: String,
  location: String,
  role:{type:String, default:"user"},
});
export const User = mongoose.model("user", userSchema);