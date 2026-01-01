import User from "../Model/User.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  try {
      console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const profilePhoto = req.file ? req.file.path : "";
 

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (err) {
    console.error("REGISTER ERROR ", err);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message, 
    });
  }
};


export { register };
