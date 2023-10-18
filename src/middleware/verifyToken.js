import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
      let auth = req.headers.authorization; //token are sent here
  
      let token = auth?.split(" ")[1];
      console.log(token, "array auth");
  
      // console.log(req.headers, "token");
      if (!token) {
       return res.status(401).json({
          message: "No acess token is provided",
        });
      }
  
     await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: err.message,
          });
        }
        req.userId = decoded._id; //creating my object from decoder object
        
        next(); //prevent moving to the controller
      });
    } catch (error) {
      console.log(error, "server error");
      res.status(500).json({
        message: "internal server error",
      });
    }
  };
  