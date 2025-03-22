const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Appointment = require("./appointmentmodel"); // Ensure the model is correctly defined in appointmentmodel.js

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://tammineni251:HD48xr8uKtzLGeKI@cluster0.7bfjk.mongodb.net/tutionDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Get All Appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
});

// Add New Appointment
app.post("/appointments", async (req, res) => {
  try {
    const { name, age, gender, mobile, email, date, time, address } = req.body;

    if (!name || !age || !gender || !mobile || !email || !date || !time || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "✅ Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    res.status(400).json({ error: "❌ Error booking appointment" });
  }
});

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}...`);
});
