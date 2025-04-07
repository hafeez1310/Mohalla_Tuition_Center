const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { markAttendance } = require('../controllers/tutorController');

router.post('/mark-attendance', auth(['tutor']), markAttendance);

module.exports = router;