import Booking from '../Model/Booking.js'
import Event from '../Model/Event.js'
const createBookinng =async (req,res)=>{
    try{
        const {eventid}= req.body
        const  userid= req.user.id
        if (!eventId) {
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

export {createBookinng}