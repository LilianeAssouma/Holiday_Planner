
import { User } from "../../models/usermodel.js";

//get all users in the database
export const All = async(req,res)=>{
  try {
    let userData = await User.find();
    res.status(200).json(userData); 

  } catch (error) {
    console.log("error",error);
    res.status(409).json({
      message:"internal server error"
    })
  }
}

//find one user in the database by email
export const getUserByAny = async (req, res) => {                        //read by element instead of reading by id
  
  try {
    const { fieldName, value } = req.query;
    let query = {};
    query[fieldName] = value;

    let userData = await User.findOne(query);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("error",error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


//update users by email
export const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, 
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


//delete users
export const deleteUser = async (req,res)=>{
  const email = req.params.email;
  try {
    const deletedUser = User.deleteOne({email:email})

    res.status(200).json({message:`user with email:${email} successfull deleted`});

   
  } catch (error) {
    console.log("error",error);
    res.status(409).json ("Internal server errior")
  }
}
