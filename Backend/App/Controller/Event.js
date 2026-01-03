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
    const event = Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await event.deleteOne();

    res.status(200).json({
      message: "Event Delete Done",
      event,
    });
  } catch (error) {
    console.error("EVENT DELETE ERROR ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { create, getevent, deleteEvent };
