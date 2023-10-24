import { tourData } from "../../models/TourModel.js"; 
import {v2 as cloudinary} from 'cloudinary';


export const updateMany = async (req, res) => {
   
  try {
    const {tourId} = req.params; // Assuming the tour ID is passed in the request parameters
  const updatedTourDetails = req.body;
  console.log('Tour ID:', tourId);
    // Check if the tour exists
    let existingTour = await tourData.findById(tourId);

    if (!existingTour) {
      return res.status(404).json({
        message: 'Tour not found',
      });
    }
    console.log('Existing Tour:', existingTour);
    
    if (req.files && req.files.Gallery && Array.isArray(req.files.Gallery)) {
      // Upload new gallery images to cloudinary and update the image URLs in the database
      const imageUrls = [];

      for (let index = 0; index < req.files.Gallery.length; index++) {
        let galleryImage = await cloudinary.uploader.upload(req.files.Gallery[index].path);
        imageUrls.push(galleryImage.secure_url);
      }

      updatedTourDetails.Gallery = imageUrls;
    }

    // Upload backdrop image to cloudinary and update the backdrop image URL in the database
    if (req.files && req.files['backdropImage'] && req.files['backdropImage'][0]) {
      let backdropImage = await cloudinary.uploader.upload(req.files['backdropImage'][0].path);
      updatedTourDetails.backdropImage = backdropImage.secure_url;
    }

    // Update the tour details in the database
    const updatedTour = await tourData.findByIdAndUpdate(
      tourId,
      { $set: updatedTourDetails },
      { new: true } // This option ensures that you get the updated document as the result
    );

    res.status(200).json({
      message: 'Tour updated successfully',
      tour: updatedTour,
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};


   

export const oneUpdated = async (req, res) => {
    try {
        const { fieldName, value } = req.query;
        const updateFields = req.body;

        // Validate input
        if (!fieldName || !value || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        let query = {};
        query[fieldName] = value;

        // Use findOneAndUpdate to get the updated document
        let updatedElement = await tourData.findOneAndUpdate(query, { $set: updateFields }, {
            new: true, // Returns the modified document
            runValidators: true, // Runs update validators on this command
        }
        
        );

        if (!updatedElement) {
            return res.status(404).json({ error: ' Tour Details not found' });
        }

        res.status(200).json(updatedElement);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 



