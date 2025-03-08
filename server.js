require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Appointment = require("./appointmentModel");  // Import appointment model
const ContactMessage = require("./contactMessageModel");  // Import contact model
const app = express();

// MongoDB URI (store in environment variables for security)
const uri = process.env.MONGO_URI ||
  "mongodb+srv://tammineni251:oqXnygSQSfqPymte@cluster0.7bfjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
}

connectDB();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Appointment Booking Route
app.post("/book-appointment", async (req, res) => {
  try {
    const { name, age, gender, mobile, email, date, time, address } = req.body;

    // Validate input fields
    if (!name || !age || !gender || !mobile || !email || !date || !time || !address) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Save the appointment
    const newAppointment = new Appointment({
      name,
      age,
      gender,
      mobile,
      email,
      date,
      time,
      address,
    });

    await newAppointment.save();
    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Contact Message Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Save the contact message
    const newContactMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await newContactMessage.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
