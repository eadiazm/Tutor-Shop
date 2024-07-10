// errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        data: null,
        message: err.message || 'Internal Server Error',
        count: 0
    });
}

module.exports = errorHandler;
