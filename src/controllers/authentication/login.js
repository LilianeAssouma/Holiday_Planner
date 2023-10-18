import { User } from "../../models/usermodel.js";
import { comparePassword } from "../../utils/passwordFunctions.js";
import { generateToken } from "../../utils/jwtFunctions.js";


export const login = async (req,res)=> {
    try {
        const user = await User.findOne({ email: req.body.email });
   
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
    
        let isPasswordCorrect = await comparePassword(
          req.body.password,
          user.password
        );
    console.log();
        if (!isPasswordCorrect) {
          return res.status(401).json({
            message: "Wrong password",
          });
        }
        // console.log("hashedPword",req.body.password);
        let token = generateToken({
          _id: user._id,
         
        });
    
        res.status(200).json({
          message: "User logged in successfully",
          access_token: token,
          user: {
            email: user.email,
            location: user.location,
            fullName: user.fullName,
            role: user.role,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
};