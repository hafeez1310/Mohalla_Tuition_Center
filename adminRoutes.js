const router = require('express').Router();
const { addCenter, addTutor, getCenters, getTutors, getStudents, getAttendanceSummary } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/center', auth(['admin']), upload.single('image'), addCenter);
router.post('/tutor', auth(['admin']), upload.single('resume'), addTutor);
router.get('/centers', auth(['admin']), getCenters);
router.get('/tutors', auth(['admin']), getTutors);
router.get('/students', auth(['admin']), getStudents);
router.get('/attendance-summary', auth(['admin']), getAttendanceSummary);

module.exports = router;