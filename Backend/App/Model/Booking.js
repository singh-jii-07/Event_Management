
import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        require:true
    },
    status:{
        type:String,
        enum:["Booking","cancelled"],
        default:"Booking"
    }
},{timestamps:true})

const Book = mongoose.model("Booking",bookingSchema)

export default Book