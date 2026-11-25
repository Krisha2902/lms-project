const express = require('express');
const {
    getAllPublishedCourses,
    getCourseBySlug,
    createCourse,
    getInstructorCourses
} = require('../controllers/courseController');

const router = express.Router();

// Public course browsing routes
router.get('/', getAllPublishedCourses);
router.get('/:slug', getCourseBySlug);

// Instructor course management routes (will plug into teammate's auth middleware once ready)
router.post('/', createCourse);
router.get('/instructor/my-courses', getInstructorCourses);

module.exports = router;
