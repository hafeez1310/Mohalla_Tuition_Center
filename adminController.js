const Center = require('../models/Center');
const User = require('../models/User');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//add center
exports.addCenter = async (req, res) => {
  const { name, address } = req.body;
  const image = req.file?.filename || '';
  const center = new Center({ name, address, image });
  await center.save();
  res.json(center);
};

//add tutor
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

//add student
// add student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, center } = req.body;

    // ✅ LOG the incoming data
    console.log("Request Body:", { name, email, phone, center });

    const student = new Student({
      name,
      email,
      phone,
      center: new mongoose.Types.ObjectId(center) // ensure it's an ObjectId
    });

    // ✅ LOG the created student object
    console.log("Student object before saving:", student);

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    // ✅ LOG the error message
    console.error("Error adding student:", error.message);

    // ✅ Send the exact error message in the response
    res.status(500).json({
      message: "Failed to add student",
      error: error.message // this will show in Postman
    });
  }
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
