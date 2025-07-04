const sanitizeInput = (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'object') {
            if (typeof req.body.url === 'string') {
                req.body.url = req.body.url.trim();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { sanitizeInput };
