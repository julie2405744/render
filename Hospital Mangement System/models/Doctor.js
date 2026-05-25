// Hayat Hospital — models/Doctor.js
// ---------------------------------------------------------
// @Author: Member 2 (Database & Admin Manager)
// @Responsibility: Mongoose schema design and structure
// ---------------------------------------------------------
// Stores doctor records: name, sector, time slot, max capacity.
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:                { type: String, required: true },
    sector:              { type: String, required: true, enum: ['Cardiology', 'Pediatrics', 'General', 'Orthopedics'] },
    timeSlot:            { type: String, default: '' },
    maxCapacity:         { type: Number, required: true, min: 0 },
    avgConsultationTime: { type: Number, default: 15 }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
