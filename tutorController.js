const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  const { present, lat, lng } = req.body;
  const tutorId = req.user.id;
  const existing = await Attendance.findOne({ tutor: tutorId, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
  if (existing) return res.status(400).json({ message: 'Already marked attendance for today' });

  const attendance = new Attendance({
    tutor: tutorId,
    center: req.user.center,
    present,
    location: { lat, lng }
  });
  await attendance.save();
  res.json(attendance);
};