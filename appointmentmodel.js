const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Format: 'HH:MM AM/PM'
  address: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
