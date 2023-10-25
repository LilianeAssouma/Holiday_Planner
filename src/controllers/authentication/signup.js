
import { generateToken } from "../../utils/jwtFunctions.js";
import { hashPassword } from "../../utils/passwordFunctions.js";
import { User } from "../../models/usermodel.js";
import nodemailer from "nodemailer";
import { transporter } from "../../utils/Creditentials.js"; 


export const signup = async (req, res) => {

    try {
          
      const user = await User.findOne({email: req.body.email });
  
      if (user) {
        return res.status(409).json({
          message: "User already exists",
        });
      }
      let hashedPassword = await hashPassword(req.body.password); //
      // console.log("hashedPword",req.body.password);
      req.body.password = hashedPassword;
  
      let newUser = await User.create(req.body);
  
      console.log("new User",newUser); 
  
      let token = generateToken({
        _id: newUser._id,
       
      });
  
      // res.status(201).json({
      //   message: "User registered successfully",
      //   access_token: token,
      //   user: {
      //     email: newUser.email,
      //     location: newUser.location,
      //     fullName: newUser.fullName,
      //     role: newUser.role,
      //   },
      // });

      const mailOptions = {
        from: "lilyanassoum@gmail.com",
        to: newUser.email,
        subject: "Welcome to our platform",
        text: `Hello ${newUser.fullName},\n\nWelcome to our platform! Thank you for registering.`,
      };

      console.log("Before sending email"); 
      
       // Await the sending of the email
      await transporter.sendMail(mailOptions, (error,info)=>{
        if (error) {
          console.log('email sending failed',error);
        } else {
          console.log('email sent ',info.response);
        }
      }); 
     
      console.log("After sending email");

      res.status(201).json({
        message: "You registered successfully",
        access_token: token,
        user: {
          email: newUser.email,
          location: newUser.location,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      }); 

    } catch (error) { 
      console.error("Error sending email:", error);
      res.status(500).json({
       message:"internal server error",
      });
      console.log(error);
    }
  };
  