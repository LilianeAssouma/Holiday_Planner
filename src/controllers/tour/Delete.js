import { tourData } from "../../models/TourModel.js";

export const deleteOne = async (req, res) =>{
    try{
    const { id } = req.params;
    const deletedIndex = await tourData.findByIdAndDelete(id);
    if (!deletedIndex) {
       
                res.json({ 
                    message: 'Tour not found '
                 } );
                }
                res.status(200).json({message:'Tour successfull deleted'});
    }
    catch (error){
        console.log(error.message);
        res.status(500).json(error.message);
      }
}



export const deleteAll = async (req, res) => {
    try {
        const { fieldName, value } = req.query;
        let query = {};
        query[fieldName] = value;

        const deleteIndex = await tourData.deleteMany(query); 
        if (deleteIndex.deletedCount===0) {

            return res.json({ message: 'News not found' });
        }
         res.status(200).json({message:'successfull deleted',
         deletedCount: deleteIndex.deletedCount});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};