const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Student ID is required'],
            index: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course ID is required'],
            index: true
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'dropped'],
            default: 'active'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        lastAccessedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Compound Unique Index: Prevents duplicate enrollments (State Machine Integrity)
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

// Query index for student dashboard (< 200ms API Latency SLA)
enrollmentSchema.index({ studentId: 1, status: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
