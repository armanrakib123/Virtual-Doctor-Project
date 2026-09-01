const mongoose = require('mongoose');

const patientMessageSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
    status: { type: String, default: 'Unread' }
}, { timestamps: true });

module.exports = mongoose.model('PatientMessage', patientMessageSchema);
