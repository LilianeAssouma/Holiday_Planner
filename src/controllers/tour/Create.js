import multer from "multer";
import uploadCloudinary from "../../utils/cloudinary.js";
import { tourData } from "../../models/TourModel.js";

export const addnew = async (req, res) => {
  try {
   
    if (req.file) {
      const image = await uploadCloudinary(req.file);
       req.body.backdropImage = image

      let newTour = req.body 
      await tourData.create(newTour);

    res.status(201).json(newTour)
    }

  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};

export const addMany = async (req, res) => {
  try {
    const tourDetails = req.body;

    if (req.file) {
      const image = await uploadCloudinary(req.file);
      req.body.backdropImage = image

      let newTour = req.body 
      
      await tourData.insertMany(tourDetails);

      res.status(201).json({
        message: "Tours created",
      });
    }
   

  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};
