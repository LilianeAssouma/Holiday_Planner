import multer from "multer";
import uploadCloudinary from "../../utils/cloudinary.js";
import { tourData } from "../../models/TourModel.js";

export const addnew = async (req, res) => {
  try {
    if (req.file) {
      const image = await uploadCloudinary(req.file);
      console.log(image);
    }

    const newTour = new tourData(req.body);

    await newTour.save();

    res.status(201).json({
      message: "Tour created",
    });
  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};

export const addMany = async (req, res) => {
  try {
    let details = await tourData.insertMany(req.body);

    res.status(201).json(details);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};
