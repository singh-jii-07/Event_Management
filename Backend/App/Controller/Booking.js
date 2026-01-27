import Booking from '../Model/Booking.js'
import Event from '../Model/Event.js'
const createBookinng =async (req,res)=>{
    try{
        const {eventid}= req.body
        const  userid= req.user.id
        if (!eventid) {
      return res.status(400).json({ message: "Event ID required" });
    }

    const event = await Event.findById(eventid);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
  const booking = await Booking({
    user:userid,
    event:eventid
  })
  booking.save()
  res.status(201).json({
      message: "Event booked successfully",
      booking,
    });
    }
    catch(err){
        res.status(500).json({
            message:"internal server Error",
            error: err.message,
        })
    
    }
}

const getbook = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event")
      .populate("user");

    res.status(200).json({
      message: "All Booking",
      bookings, // 👈 same name frontend ke liye
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server Error",
      error: err.message,
    });
  }
};


const deleteBooking = async (req, res) =>{
  try{
   const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
   booking.status = "cancelled";
  
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  }

  const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("event");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {createBookinng,getbook,deleteBooking,getMyBookings}