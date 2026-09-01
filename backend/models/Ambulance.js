const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    driverName: { type: String },
    contact: { type: String },
    vehicleNumber: { type: String },
    location: { type: String },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ambulance', ambulanceSchema);
