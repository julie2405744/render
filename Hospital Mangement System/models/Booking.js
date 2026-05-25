// Hayat Hospital — models/Booking.js
// ---------------------------------------------------------
// @Author: Member 2 (Database & Admin Manager)
// @Responsibility: Mongoose schema design and structure
// ---------------------------------------------------------
// Stores patient bookings: which doctor, patient name, appointment type.
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctorName:      { type: String, required: true },
    patientName:     { type: String, required: true },
    patientId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointmentType: { type: String, required: true, enum: ['Consultation', 'Follow-up', 'Lab Result'] },
    appointmentTime: { type: Date },
    expiresAt:       { type: Date, expires: 0 } // MongoDB TTL index auto-deletes when time is reached
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
