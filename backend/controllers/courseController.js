const mongoose = require('mongoose');
const Course = require('../models/Course');
const { sendSuccess, sendError } = require('../utils/apiResponse');

// Get all published courses (public endpoint, lean & fast for < 200ms SLA)
const getAllPublishedCourses = async (req, res) => {
    try {
        const { category, level } = req.query;
        const filter = { isPublished: true };

        if (category) filter.category = category;
        if (level) filter.level = level;

        // Projection: exclude heavy text contents for listing speed
        const courses = await Course.find(filter)
            .select('title slug subtitle category level price thumbnailUrl instructorId chapters.title chapters.order chapters.lessons.title chapters.lessons.durationMinutes chapters.lessons.isFreePreview')
            .lean();

        return sendSuccess(res, 200, 'Courses retrieved successfully', {
            count: courses.length,
            courses
        });
    } catch (error) {
        return sendError(res, 500, 'Failed to fetch courses', error);
    }
};

// Get single course by slug
const getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const course = await Course.findOne({ slug }).lean();

        if (!course) {
            return sendError(res, 404, 'Course not found');
        }

        return sendSuccess(res, 200, 'Course details retrieved successfully', { course });
    } catch (error) {
        return sendError(res, 500, 'Failed to retrieve course', error);
    }
};

// Create a new course (Instructor endpoint)
const createCourse = async (req, res) => {
    try {
        const { title, subtitle, description, category, level, price, thumbnailUrl } = req.body;

        if (!title || !description || !category) {
            return sendError(res, 400, 'Please provide title, description, and category');
        }

        // Use logged-in user ID if present, or body ID, or mock instructor ObjectId for standalone testing
        const instructorId =
            (req.user && req.user._id) ||
            req.body.instructorId ||
            new mongoose.Types.ObjectId();

        const course = await Course.create({
            title,
            subtitle,
            description,
            category,
            level: level || 'Beginner',
            price: price || 0,
            thumbnailUrl: thumbnailUrl || '',
            instructorId,
            chapters: []
        });

        return sendSuccess(res, 201, 'Course created successfully as draft', { course });
    } catch (error) {
        return sendError(res, 500, error.message || 'Course creation failed', error);
    }
};

// Get all courses authored by instructor
const getInstructorCourses = async (req, res) => {
    try {
        const instructorId = (req.user && req.user._id) || req.query.instructorId;
        const filter = instructorId ? { instructorId } : {};

        const courses = await Course.find(filter)
            .select('title slug category level price isPublished createdAt chapters')
            .lean();

        return sendSuccess(res, 200, 'Instructor courses retrieved successfully', {
            count: courses.length,
            courses
        });
    } catch (error) {
        return sendError(res, 500, 'Failed to retrieve instructor courses', error);
    }
};

// Get protected lesson content (Video URL / Text) - Protected by checkEnrollment middleware
const getLessonContent = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;

        const course = await Course.findById(courseId).select('title chapters').lean();
        if (!course) {
            return sendError(res, 404, 'Course not found');
        }

        let targetLesson = null;
        let chapterTitle = '';

        for (const chapter of course.chapters) {
            const found = chapter.lessons.find((l) => l.lessonId === lessonId);
            if (found) {
                targetLesson = found;
                chapterTitle = chapter.title;
                break;
            }
        }

        if (!targetLesson) {
            return sendError(res, 404, 'Lesson not found in this course');
        }

        return sendSuccess(res, 200, 'Lesson content accessed securely', {
            courseId,
            courseTitle: course.title,
            chapterTitle,
            lesson: {
                lessonId: targetLesson.lessonId,
                title: targetLesson.title,
                contentType: targetLesson.contentType,
                videoUrl: targetLesson.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
                textContent: targetLesson.textContent,
                durationMinutes: targetLesson.durationMinutes,
                isFreePreview: targetLesson.isFreePreview
            },
            accessGrantedVia: req.isFreePreview ? 'free_preview' : 'active_enrollment'
        });
    } catch (error) {
        return sendError(res, 500, 'Failed to fetch lesson content', error);
    }
};

module.exports = {
    getAllPublishedCourses,
    getCourseBySlug,
    createCourse,
    getInstructorCourses,
    getLessonContent
};
