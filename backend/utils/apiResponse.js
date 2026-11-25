// Standard JSON Response Utility
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data
    });
};

const sendError = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
};

module.exports = {
    sendSuccess,
    sendError
};
