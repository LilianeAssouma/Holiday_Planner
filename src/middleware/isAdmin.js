import express from "express";
import { User } from "../models/usermodel.js";


export const isAdmin = async (req, res, next) => {
    try {
      const { userId } = req; //stracturing
  
      const user = await User.findById(userId);
  
      console.log(user, "User");
  
      if (user?.role !== "admin") {
        return res.status(403).json({
          message: "You cannot acess this unless you are an admin",
        });
      }
      // res.send("welcome admin");
       next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };