import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mainRouter from "./src/routes/index.js"
import "dotenv/config";


const port= 3000;
const app = express();
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

mongoose.connect(process.env.DB_CONNECTION_PROD).then((res) => {
    console.log("connected");
  });

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
