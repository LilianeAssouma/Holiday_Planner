
import { User } from "../../models/usermodel.js";

import { catchAsync } from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";


//get all users in the database
export const All = catchAsync(async(req,res, next)=>{
  let userData = await User.find();

  res.status(200).json(userData); 

}
)

//find one user in the database by email
export const getUserByAny = catchAsync(async (req, res, next) => {                        //read by element instead of reading by id
  
    const { fieldName, value } = req.query;
    let query = {};
    query[fieldName] = value;

    let userData = await User.findOne(query);
    const error = new AppError("Error message", 404);
    if (!userData) {
      return next(new AppError('No user found with that address', 404));
    }
    // if (!userData) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    res.status(200).json(userData);
  
})


//update users by email
export const updateById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const updatedFields = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, 
      { $set: updatedFields },
      { new: true }
    );

    // if (!updatedUser) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    if (!userData) {
      return next(new AppError('No user found with that address', 404));
    }
    return res.status(200).json(updatedUser);
  }
)


//delete users
export const deleteUser = catchAsync(async (req,res, next)=>{
    const { id} = req.params;
    const deletedIndex = await User.findByIdAndDelete(id);
    if (!deletedIndex) {

      if (!deletedIndex) {
        
        return next(new AppError('No user found with that address', 404));
      }
      //res.json({ message: 'User not found '} );
                }
                res.status(200).json({message:'User successfull deleted'});
    }
)
