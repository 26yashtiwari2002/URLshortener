// middlewares/validateRequest.js
function validateRequest(req, res, next) {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Valid URL is required' });
    }
    next(); // continue if valid
}
module.exports = validateRequest;
