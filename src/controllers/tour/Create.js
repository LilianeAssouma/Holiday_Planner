import multer from "multer";
import uploadCloudinary from "../../utils/cloudinary.js";
import { tourData } from "../../models/TourModel.js";

export const addnew = async (req, res) => {
  try {
    let backdropImage= " ";
    if (req.file) {
      const image = await uploadCloudinary(req.file);
      console.log(image);
      backdropImage = image.url;
    }

    const newTour = new tourData(req.body);

    await newTour.save();
    res.status(201).json({newTour,
      backdropImage: backdropImage,
    })
    // res.status(201).json({
    //   message: "Tour created",
    // });
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
      console.log(image);
      // tourDetails.forEach(tour => {                //add image url to ech tour data object
      //   tour.image = image.url;
      // });
    }
    await tourData.insertMany(tourDetails);

    res.status(201).json({
      message: "Tours created",
    });

  } catch (error) {
    console.log("error", error);
    res.status(409).json({
      message: "internal server error",
    });
  }
};
