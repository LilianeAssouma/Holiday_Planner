import multer from "multer";
import uploadCloudinary from "../../utils/cloudinary.js";
import { tourData } from "../../models/TourModel.js";

import {v2 as cloudinary} from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    
});



export const addGallery = async (req, res) => {
  try {
    const tourDetails = req.body;
    const imageUrls = [];

      if (req.files) {
        
        let backdropImage = await cloudinary.uploader.upload(req.files['backdropImage'][0].path)
       
tourDetails. backdropImage = backdropImage.secure_url
      
  //upload image url to cloudinary and store it to array
        for (let index = 0; index < req.files.Gallery.length; index++) {
      imageUrls.push((await cloudinary.uploader.upload(req.files.Gallery[index].path)).secure_url) 
          
        }
        tourDetails.Gallery = imageUrls;

        let addGalleys= await tourData.create(tourDetails);

        if (!addGalleys) {
         return res.status(404).json({
            message : "failed to save tour"
          })
          
        }
      res.status(201).json({
        message: "Tours created",tourDetails
      });
    }
      else{
        res.status(400).json({
          message:"At least one image is required"
        })
      }
    }
   
 catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};

