import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  // Validate request body here

  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ success: false, message: err.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

// get single booking by Id
export const getBooking = async (req, res) => {
    const { id } = req.params;
    console.log("id: ", req);
  try {
    const books = await Booking.findById(id);
    console.log("books: ", books);
    res.status(200).json({
      suscess: true,
      message: "successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ suscess: false, message: "not found" });
  }
};
//get all booking

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      suscess: true,
      message: "successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ suscess: false, message: "not found" });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
      // Deleting the Booking by ID
      const deletedBooking = await Booking.findByIdAndDelete(id);

      if (!deletedBooking) {
          return res.status(404).json({ message: "Booking not found" });
      }

      // Sending a success message as a response
      res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
      console.error("Error deleting Booking:", error);
      res.status(500).json({ message: "Something went wrong" });
  }
};
