const express = require('express');
const {
    getAllPublishedCourses,
    getCourseBySlug,
    createCourse,
    getInstructorCourses,
    getLessonContent
} = require('../controllers/courseController');
const checkEnrollment = require('../middleware/checkEnrollment');

const router = express.Router();

// Public course browsing routes
router.get('/', getAllPublishedCourses);
router.get('/:slug', getCourseBySlug);

// Secure Lesson Asset Delivery (Protected by checkEnrollment Access Gate)
router.get('/:courseId/lessons/:lessonId/content', checkEnrollment, getLessonContent);

// Instructor course management routes
router.post('/', createCourse);
router.get('/instructor/my-courses', getInstructorCourses);

module.exports = router;
