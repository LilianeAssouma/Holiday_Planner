
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// import contactController from './contactController';
import AppError from "./src/utils/appError.js";
import { globalControllerHandler } from "./src/controllers/ErrorController.js";

import mainRouter from "./src/routes/index.js"
import "dotenv/config";

const port= 3000;
const app = express();

app.use(bodyParser.json());

app.use(cors())
app.use("/api/v1", mainRouter);

//handle Router
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalControllerHandler);

// app.use(contactController);

// app.get("/", (req,res)=>{
//   console.log("Hello world");
//   res.status(200).json({
//     message: " HELLO "
//   })
// });

// Swagger
const options = {
  definition:{
    openapi: "3.0.0",
    info :{
      title: "Assouma api doc",
      version:"1.0.0",
      description:"Holiday-planner apis doc",
      contact: {
        name:"Api",
        email: "lilyanassoum@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
      {url:"https://holiday-planner-4lnj.onrender.com"}
    ],
  },
  apis: ["./src/routes/*.js"] 
}
 
const specs =swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs)
)




mongoose.connect(process.env.DB_CONNECTION_PROD).then((res) => {
    console.log("connected");
  });

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
