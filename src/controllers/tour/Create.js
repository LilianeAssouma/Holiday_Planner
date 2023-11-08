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

    //if (req.files && req.files.Gallery && Array.isArray(req.files.Gallery)) {
      // Upload backdrop image to cloudinary
      if (req.files['backdropImage'] && req.files['backdropImage'][0]) {
        let backdropImage = await cloudinary.uploader.upload(req.files['backdropImage'][0].path);
        tourDetails.backdropImage = backdropImage.secure_url;
      } else {
        return res.status(400).json({
          message: "Backdrop image is required"
        });
      }

    //   // Upload image urls to cloudinary and store them in the array
    //   // for (let index = 0; index < req.files.Gallery.length; index++) {
    //   //   let galleryImage = await cloudinary.uploader.upload(req.files.Gallery[index].path);
    //   //   imageUrls.push(galleryImage.secure_url);
    //   // }
    //   //tourDetails.Gallery = imageUrls;

      let addGalleys = await tourData.create(tourDetails);

      if (!addGalleys) {
        return res.status(404).json({
          message: "Failed to save tour"
        });
      }

    //   res.status(201).json({
    //     message: "Tour created",
    //     tourDetails
    //   });
    // } else {
    //   res.status(400).json({
    //     message: "At least one image is required"
    //   });
    //  }
    res.status(201).json({
          message: "Tour created",
          tourDetails
        });
     // }
  } catch (error) {
    console.error("Error", error);
    res.status(409).json({
      message: "Internal server error"
    });
  }
};




