const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center' },
  date: { type: Date, default: Date.now },
  present: { type: Boolean, default: false },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);