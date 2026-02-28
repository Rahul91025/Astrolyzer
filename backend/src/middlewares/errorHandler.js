/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { details: err.stack }),
    });
};

module.exports = errorHandler;
