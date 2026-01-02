import express from "express";
// import upload from "../Middleware/upload.js";
import { login, logout, profile, register } from "../Controller/User.js";
import Auth from '../Middleware/Auth.js'

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
userRoute.get ("/profile",Auth,profile)

export default userRoute;
