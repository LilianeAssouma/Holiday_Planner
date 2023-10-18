import { User } from "../../models/usermodel.js";
import { comparePassword } from "../../utils/passwordFunctions.js";
import { hashPassword } from "../../utils/passwordFunctions.js";

export const changePassword =async (req,res) =>{

    try {
    const { currentPassword, newPassword} =req.body;
    const {userId} = req;
    const user =await User.findById(userId);
  
//checking if current password is correct by  creating a boolean 
    let isPassword =await comparePassword(currentPassword, user.password); 
if (!isPassword) {
    return res.status(404).json ({
        message: "wrong password",
    }) 
}
let hashedPassword =await hashPassword (newPassword);
user.password = hashedPassword; 
await user.save(); 

res.status(200).json({
    message:"password change successful"
})

} catch (error) {
    console.log("error",error);
   res.status(500).json({
    message: "internal server error",
   })
}
   
}