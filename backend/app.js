const express = require('express');
const cors = require('cors');

const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const { sendError } = require('./utils/apiResponse');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Base Health Check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Axlero LMS API Server is running',
        version: '1.0.0'
    });
});

// Mount Routes (Auth routes will be mounted by teammate at /api/auth)
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// 404 Route Handler
app.use((req, res) => {
    sendError(res, 404, `Route not found: ${req.originalUrl}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    sendError(res, err.statusCode || 500, err.message || 'Internal Server Error', err);
});

module.exports = app;
