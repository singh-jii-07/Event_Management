import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event_app/users",
    allowed_formats: ["jpg", "png", "jpeg","Heic"],
  },
});

const upload = multer({ storage });

export default upload;