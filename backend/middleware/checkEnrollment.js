const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { sendError } = require('../utils/apiResponse');

// Middleware to gate access to course lessons based on enrollment status or free preview
const checkEnrollment = async (req, res, next) => {
    try {
        const { courseId, lessonId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return sendError(res, 400, 'Invalid course ID format');
        }

        // Fetch course structure to check free preview status
        const course = await Course.findById(courseId).select('chapters isPublished').lean();
        if (!course) {
            return sendError(res, 404, 'Course not found');
        }

        // Check if the requested lesson is marked as a Free Preview
        let isFree = false;
        if (lessonId && course.chapters) {
            for (const chapter of course.chapters) {
                const lesson = chapter.lessons.find((l) => l.lessonId === lessonId);
                if (lesson && lesson.isFreePreview) {
                    isFree = true;
                    break;
                }
            }
        }

        if (isFree) {
            req.isFreePreview = true;
            return next();
        }

        // Identify student ID from auth token, body, query, or custom dev header
        const studentId =
            (req.user && req.user._id) ||
            (req.body && req.body.studentId) ||
            (req.query && req.query.studentId) ||
            req.headers['x-student-id'];

        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return sendError(
                res,
                401,
                'Authentication or valid Student ID required to access protected lessons'
            );
        }

        // Query active enrollment using compound index { studentId: 1, courseId: 1 }
        const enrollment = await Enrollment.findOne({
            studentId,
            courseId,
            status: { $in: ['active', 'completed'] }
        }).lean();

        if (!enrollment) {
            return sendError(
                res,
                403,
                'Access Denied: You must be enrolled in this course to access this lesson'
            );
        }

        req.enrollment = enrollment;
        next();
    } catch (error) {
        return sendError(res, 500, 'Error verifying course enrollment', error);
    }
};

module.exports = checkEnrollment;
