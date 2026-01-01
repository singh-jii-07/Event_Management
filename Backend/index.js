import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.mongoose_url)
  .then(
    console.log("db connect"),
    app.listen(process.env.PORT, () => {
      console.log(`App running at the port ${process.env.PORT}`);

      app.get("/", (req, res) => {
        res.send("Api is running Event_management");
      });
    })
  )
  .catch((err) => {
    console.log("DB connection failed:", err);
  });
