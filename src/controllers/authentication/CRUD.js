
import { User } from "../../models/usermodel.js";

export const All = async(req,res)=>{
  try {
    let userData = await User.find();
    res.status(200).json(userData); 

  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}