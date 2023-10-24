import { tourData } from "../../models/TourModel.js"; 
export const updateMany = async (req, res)=> {
    try {
        const { fieldName, value } = req.query;
        const updateFields = req.body; 

        let query = {};
        query[fieldName] = value;

        let updatedElement = await tourData.updateMany(query, updateFields, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedElement) {
            return res.status(404).json({ error: 'Element not found' });
        }

        res.status(200).json(updatedElement);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: 'Internal Server Error' });
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

 



