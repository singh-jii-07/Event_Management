import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./App/Routes/User.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");

    app.listen(process.env.PORT, () => {
      console.log(`App running at the port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });

app.get("/", (req, res) => {
  res.send("Api is running Event_management");
});
