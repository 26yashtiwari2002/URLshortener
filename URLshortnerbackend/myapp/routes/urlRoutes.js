const express = require('express');
const router = express.Router();
const { shortenUrlHandler, redirectUrl } = require('../service/urlService');

// POST route to shorten a URL
router.post('/shorten', shortenUrlHandler);

// GET route to redirect using shortId
router.get('/:shortId', async (req, res, next) => {
    try {
        const originalUrl = await redirectUrl(req.params.shortId);
        res.redirect(originalUrl);
    } catch (error) {
        if (error.message.includes('not found')) {
            return res.status(404).json({ 
                error: { message: 'Short URL not found' }
            });
        }
        next(error);
    }
});

module.exports = router;
