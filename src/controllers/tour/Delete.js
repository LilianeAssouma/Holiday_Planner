import { tourData } from "../../models/TourModel.js";

export const deleteOne = async (req, res) =>{
    try{
    const { id } = req.params;
    const deletedIndex = await tourData.findByIdAndDelete({Title: Title});
    if (!deletedIndex) {
       
                res.json({ 
                    message: 'News not found '
                 } );
                }
                res.status(200).json({message:'News successfull deleted'});
    }
    catch (error){
        console.log(error.message);
        res.status(500).json(error.message);
      }
}

export const deleteAll = async (req, res) => {
    try {
        let deleteIndex = await tourData.deleteMany({title:req.params.title}); 
        if (!deleteIndex) {
            return res.json({ message: 'News not found' });
        }
        return res.status(200).json({message:'News successfull deleted'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};