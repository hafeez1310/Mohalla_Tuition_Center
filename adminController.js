const Center = require('../models/Center');
const User = require('../models/User');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');

exports.addCenter = async (req, res) => {
  const { name, address } = req.body;
  const image = req.file?.filename || '';
  const center = new Center({ name, address, image });
  await center.save();
  res.json(center);
};

exports.addTutor = async (req, res) => {
  const { name, email, password, center } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Tutor already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const resume = req.file?.filename || '';
  const user = new User({ name, email, password: hashedPassword, role: 'tutor', center, resume });
  await user.save();
  res.json(user);
};

exports.getCenters = async (req, res) => {
  const centers = await Center.find();
  res.json(centers);
};

exports.getTutors = async (req, res) => {
  const tutors = await User.find({ role: 'tutor' }).populate('center');
  res.json(tutors);
};

exports.getStudents = async (req, res) => {
  const students = await Student.find().populate('center');
  res.json(students);
};

exports.getAttendanceSummary = async (req, res) => {
  const attendance = await Attendance.find().populate('tutor center');
  res.json(attendance);
};
