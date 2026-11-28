const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Enroll in a course (Idempotent: prevents duplicate enrollments)
const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return sendError(res, 400, 'Invalid course ID format');
        }

        // Verify that course exists
        const course = await Course.findById(courseId).select('title price isPublished').lean();
        if (!course) {
            return sendError(res, 404, 'Course not found');
        }

        // Resolve student ID from auth token, body, or header
        const studentId =
            (req.user && req.user._id) ||
            req.body.studentId ||
            req.headers['x-student-id'] ||
            new mongoose.Types.ObjectId();

        // Check if student is already enrolled (Idempotency)
        let enrollment = await Enrollment.findOne({ studentId, courseId });

        if (enrollment) {
            return sendSuccess(res, 200, 'Already enrolled in this course', {
                enrollment,
                isNew: false
            });
        }

        // Create new enrollment
        enrollment = await Enrollment.create({
            studentId,
            courseId,
            status: 'active',
            enrolledAt: new Date(),
            lastAccessedAt: new Date()
        });

        return sendSuccess(res, 201, 'Successfully enrolled in course', {
            enrollment,
            isNew: true
        });
    } catch (error) {
        // Handle MongoDB E11000 duplicate key error gracefully
        if (error.code === 11000) {
            const existing = await Enrollment.findOne({
                studentId: req.body.studentId,
                courseId: req.params.courseId
            });
            return sendSuccess(res, 200, 'Already enrolled in this course', {
                enrollment: existing,
                isNew: false
            });
        }
        return sendError(res, 500, error.message || 'Failed to enroll in course', error);
    }
};

// Get all courses enrolled by the current student (< 200ms latency)
const getMyEnrolledCourses = async (req, res) => {
    try {
        const studentId =
            (req.user && req.user._id) ||
            req.query.studentId ||
            req.headers['x-student-id'];

        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return sendError(res, 400, 'Valid Student ID is required to fetch enrolled courses');
        }

        const enrollments = await Enrollment.find({ studentId, status: 'active' })
            .populate({
                path: 'courseId',
                select: 'title slug subtitle category level thumbnailUrl price chapters.title'
            })
            .sort({ lastAccessedAt: -1 })
            .lean();

        return sendSuccess(res, 200, 'Enrolled courses retrieved successfully', {
            count: enrollments.length,
            enrollments
        });
    } catch (error) {
        return sendError(res, 500, 'Failed to fetch enrolled courses', error);
    }
};

// Check if a student is enrolled in a specific course
const checkEnrollmentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return sendError(res, 400, 'Invalid course ID format');
        }

        const studentId =
            (req.user && req.user._id) ||
            req.query.studentId ||
            req.headers['x-student-id'];

        if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
            return sendSuccess(res, 200, 'Enrollment status checked', {
                isEnrolled: false,
                status: null
            });
        }

        const enrollment = await Enrollment.findOne({
            studentId,
            courseId,
            status: { $in: ['active', 'completed'] }
        })
            .select('status enrolledAt lastAccessedAt')
            .lean();

        return sendSuccess(res, 200, 'Enrollment status checked', {
            isEnrolled: !!enrollment,
            status: enrollment ? enrollment.status : null,
            enrollment
        });
    } catch (error) {
        return sendError(res, 500, 'Failed to check enrollment status', error);
    }
};

module.exports = {
    enrollInCourse,
    getMyEnrolledCourses,
    checkEnrollmentStatus
};
