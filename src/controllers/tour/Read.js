import {tourData} from "../../models/TourModel.js";


// export const getAll = async (req,res)=>{
// try {
//   const tours = await tourData.aggregate([
//     {
//       $group:{
//         _id: null,
//         totalTours: { $sum: 1},      // count number of tours
//        data: {$push: "$$ROOT"}      //fetching tour details
//       }
//     }
//   ]);
//   res.status(200).json({
//     totalTours: tours[0].totalTours,
//     data: tours[0].data
//   })
//   }
//  catch (error) {
//   console.log("error",error);
//   res.status(500).json({
//     message: "Internal server error"
//   })
// }
// }

export const getAll = async(req,res)=>{
  try {
    let details = await tourData.find();
    res.status(200).json(details); 

  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }

}


export const getOne =async (req,res)=>{                 
  let data = await tourData.findById(req.params.id);
  res.status(200).json(data);
  }

  export const getElement= async (req, res) => {                        //read by element instead of reading by id
  
    try {
      const { fieldName, value } = req.query;
      let query = {};
      query[fieldName] = value;
  
      let data = await tourData.findOne(query);
  
      if (!data) {
        return res.status(404).json({ error: 'Tour not found' });
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error("error",error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  