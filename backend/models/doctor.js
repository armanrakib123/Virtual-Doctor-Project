const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expertise: { type: String }, // alias for speciality
    speciality: { type: String },
    image: { type: String },
    date: { type: String },
    desc: { type: String }, // alias for about
    about: { type: String },
    contact: { type: String },
    ammount: { type: String }, // consulting fee alias
    fees: { type: Number },
    experience: { type: String },
    degree: { type: String },
    address: { type: Object },
    available: { type: Boolean, default: true }
}, { timestamps: true, collection: 'All_Doctor' });

module.exports = mongoose.model('Doctor', doctorSchema);
