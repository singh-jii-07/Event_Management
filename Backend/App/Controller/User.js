import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const register = async (req, res) => {
  try {
    
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

    //  const profilePhoto = req.file ? req.file.path : "";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      // profilePhoto,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Enter all fields",
      });
    }

    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

   
    const ismatch = await bcrypt.compare(password, checkuser.password);

    if (!ismatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

   
    const token = jwt.sign(
      { id: checkuser._id, role: checkuser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  } catch (err) {
    console.error("Login Error", err);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const logout= async (req, res) =>{
   try {
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};


export { register, login,logout };
