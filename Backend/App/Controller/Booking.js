import Booking from '../Model/Booking.js'
import Event from '../Model/Event.js'
import User from '../Model/User.js'

const createBookinng = async (req, res) => {
  try {
    const { eventid } = req.body;
    const userid = req.user.id;
    if (!eventid) {
      return res.status(400).json({ message: "Event ID required" });
    }

    const event = await Event.findById(eventid);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const booking = await Booking({ user: userid, event: eventid });
    booking.save();
    res.status(201).json({ message: "Event booked successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "internal server Error", error: err.message });
  }
};

const getbook = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("event").populate("user");
    res.status(200).json({ message: "All Booking", bookings });
  } catch (err) {
    res.status(500).json({ message: "internal server Error", error: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── NEW: Cancel Booking (ownership validated) ───────────────────────────────
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ownership check — only the booking owner can cancel
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    // Prevent duplicate cancellation
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// ─── NEW: Admin Stats (KPIs + monthly trend + top events) ────────────────────
const getStats = async (req, res) => {
  try {
    const [totalBookings, cancelledBookings, totalUsers, totalEvents] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "cancelled" }),
      User.countDocuments(),
      Event.countDocuments(),
    ]);

    const activeBookings = totalBookings - cancelledBookings;

    // Monthly bookings for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyTrend = await Booking.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const formattedTrend = monthlyTrend.map((m) => ({
      month: monthNames[m._id.month - 1],
      total: m.count,
      cancelled: m.cancelled,
      active: m.count - m.cancelled,
    }));

    // Top 5 events by booking count
    const topEvents = await Booking.aggregate([
      { $group: { _id: "$event", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "eventData",
        },
      },
      { $unwind: { path: "$eventData", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: { $ifNull: ["$eventData.title", "Deleted Event"] },
          bookings: "$count",
        },
      },
    ]);

    res.status(200).json({
      totalBookings,
      activeBookings,
      cancelledBookings,
      totalUsers,
      totalEvents,
      monthlyTrend: formattedTrend,
      topEvents,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export { createBookinng, getbook, deleteBooking, getMyBookings, cancelBooking, getStats };