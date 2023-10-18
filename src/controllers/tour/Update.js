import { tourData } from "../../models/TourModel.js"; 
export const updateOne = async (req, res)=> {
 try { 
     const { id } = req.params;
    const updatedNews = await tourData.findByIdAndUpdate(id, req.body,{new:true});
    if (!updatedNews) {
      
        res.status(500).json({ message: 'Details not found' });
        };
        res.status(200).json(updatedNews);
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