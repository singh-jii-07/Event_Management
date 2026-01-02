import express from "express";
// import upload from "../Middleware/upload.js";
import { login, logout, register } from "../Controller/User.js";

const userRoute = express.Router();

userRoute.post(
  "/register",
  // upload.single("profilePhoto"),
  register
);

userRoute.post (
  "/login",login
)

userRoute.post("/logout",logout)

export default userRoute;
