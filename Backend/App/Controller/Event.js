import Event from "../Model/Event.js";

const create = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({
        message: "All Filed All Require",
      });
    }

    const newCreate = await Event({
      title,
      description,
      date,
      time,
      location,
    });
    newCreate.save();

    res.status(200).json({
      message: "Event Create Done",
      newCreate,
    });
  } catch (error) {
    console.error("EVENT CREATE ERROR ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
    
const getevent = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json({
      message: "All Event",
      event,
    });
  } catch (error) {
    console.error("EVENT GET ERROR ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Event deleted successfully",
    });

  }
   catch (err) {
    console.error("EVENT DELETE ERROR ", err);

    return res.status(500).json({
      message: "Failed to delete event",
      error: err.message, 
    });
  }
};

const editEvent =async (req, res) =>{
 try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.time =req.body.time || event.time

    const updatedEvent = await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export { create, getevent, deleteEvent, editEvent,getSingleEvent };
