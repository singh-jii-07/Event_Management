import User from "../Model/User.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const useExisting = await User.findone({ email });
    if (userExisting) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const Hashpasword = await bcrypt.hash(password, 10);

    const profilePhoto = req.file;

    const newUser = await User({
      name,
      email,
      password: Hashpasword,
      profilePhoto
    });

    newUser.save();
    res.status(200).json({
      message: "user register Done",
      newUser,
    });
  } catch (err) {
    console.log("Something is error ", err);
  }
};

export { register };
