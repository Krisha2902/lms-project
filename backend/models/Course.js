const mongoose = require('mongoose');

// Lesson Subdocument Schema
const lessonSchema = new mongoose.Schema(
    {
        lessonId: {
            type: String,
            default: () => new mongoose.Types.ObjectId().toString()
        },
        title: {
            type: String,
            required: [true, 'Lesson title is required'],
            trim: true
        },
        order: {
            type: Number,
            required: true,
            default: 1
        },
        contentType: {
            type: String,
            enum: ['video', 'article', 'quiz'],
            default: 'video'
        },
        videoUrl: {
            type: String,
            default: ''
        },
        textContent: {
            type: String,
            default: ''
        },
        durationMinutes: {
            type: Number,
            default: 10
        },
        isFreePreview: {
            type: Boolean,
            default: false
        }
    },
    { _id: false }
);

// Chapter Subdocument Schema
const chapterSchema = new mongoose.Schema(
    {
        chapterId: {
            type: String,
            default: () => new mongoose.Types.ObjectId().toString()
        },
        title: {
            type: String,
            required: [true, 'Chapter title is required'],
            trim: true
        },
        order: {
            type: Number,
            required: true,
            default: 1
        },
        summary: {
            type: String,
            default: ''
        },
        lessons: [lessonSchema]
    },
    { _id: false }
);

// Course Root Schema
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Course title is required'],
            trim: true,
            maxlength: [120, 'Course title cannot exceed 120 characters']
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        subtitle: {
            type: String,
            trim: true,
            default: ''
        },
        description: {
            type: String,
            required: [true, 'Course description is required']
        },
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'An instructor must be assigned to this course']
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner'
        },
        price: {
            type: Number,
            default: 0,
            min: [0, 'Price cannot be negative']
        },
        thumbnailUrl: {
            type: String,
            default: ''
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        chapters: [chapterSchema]
    },
    {
        timestamps: true
    }
);

// Fast Performance Compound Indexes (< 200ms API Latency SLA)
courseSchema.index({ slug: 1 });
courseSchema.index({ instructorId: 1 });
courseSchema.index({ isPublished: 1, category: 1 });

// Helper to auto-generate slug from title
courseSchema.pre('save', function (next) {
    if (this.isModified('title') || !this.slug) {
        const baseSlug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        // Append short timestamp suffix to avoid duplicate collisions
        this.slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
