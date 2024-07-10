// responseFormatter.js
function removeNulls(obj) {
    return Object.keys(obj)
        .filter(key => obj[key] !== null && obj[key] !== undefined)
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {});
}

function responseFormatter(req, res, next) {
    res.success = function (data, message, count) {
        const response = removeNulls({
            success: true,
            data: data,
            message: message || null,
            count: count || (Array.isArray(data) ? data.length : 1)
        });
        res.json(response);
    };

    res.error = function (message) {
        const response = removeNulls({
            success: false,
            data: null,
            message: message,
            count: 0
        });
        res.json(response);
    };

    next();
}

module.exports = responseFormatter;
