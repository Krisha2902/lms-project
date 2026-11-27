const express = require('express');
const {
    enrollInCourse,
    getMyEnrolledCourses,
    checkEnrollmentStatus
} = require('../controllers/enrollmentController');

const router = express.Router();

// Enroll in a course (Idempotent)
router.post('/enroll/:courseId', enrollInCourse);

// Get student's enrolled courses list (< 200ms)
router.get('/my-courses', getMyEnrolledCourses);

// Check enrollment status for a specific course
router.get('/check/:courseId', checkEnrollmentStatus);

module.exports = router;
