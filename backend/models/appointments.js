const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // assuming User model exists
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled, Completed
    invoice: { type: String },
    cancelled: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
