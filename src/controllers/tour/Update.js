import { set } from "mongoose";
import { tourData } from "../../models/TourModel.js"; 
import { isValidObjectId } from "mongoose";

export const updateOne = async (req, res)=> {
 try { 
    const { fieldName, value } = req.query;
    const {updatedField,updatedValue}=req.body;

    let query = {};
    query[fieldName] = value;

    

    const updatedTour = await tourData.findOneAndUpdate(
        query,
       {  [updatedField]:updatedValue },
{new:true}
        );
    if (!updatedTour) {
      
        res.status(500).json({ message: 'Details not found' });
        };
        res.status(200).json(updatedTour);
    } 
    catch (error){
        console.log(error.message);
        res.status(500).json(error.message);
      }
};

export const updateMany = async (req, res)=> {
    try { 
        const { id } = req.params;
       const updateNews = await tourData.updateMany(id, req.body,{new:true});
       if (updatedNews.nModified === 0) {
           return res.status(404).json({ message: 'No updates were made' });
       }
   
           res.status(200).json(updateNews);
       } 
       catch (error){
           console.log("error",error);
           res.status(500).json({
            message:"internal server error"});
         }
   };


  


export const findOneAndUpdate = async (req, res) => {
    try {
        const { fieldName, value } = req.query;

        if (!fieldName || !value) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        // Check if the provided value is a valid MongoDB ObjectId
        if (!isValidObjectId(value)) {
            return res.status(400).json({ message: 'Invalid ObjectId' });
        }

        let query = {};
        query[fieldName] = value;

        // Find the document based on the specified field
        const tour = await tourData.findOne(query);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Allow updates to any of the specified fields
        Object.keys(req.body).forEach(key => {
            if (key in tourData.schema.paths) {
                tour[key] = req.body[key];
            }
        });

        // Save the updated document
        await tour.save();

        return res.status(200).json(tour);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
