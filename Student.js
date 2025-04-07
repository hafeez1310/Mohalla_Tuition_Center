const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);