
import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",   // ✅ SAME as User model name
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  status: {
    type: String,
    enum: ["Booking", "cancelled"],
    default: "Booking"
  }
}, { timestamps: true });


const Book = mongoose.model("Booking",bookingSchema)

export default Book