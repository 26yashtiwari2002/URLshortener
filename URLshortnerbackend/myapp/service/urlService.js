const urlRepo = require('../repository/urlRepository');
const { generateShortId } = require('../utils/shortIdGenerator');
const { saveUrl, getUrlByShortId } = require('../repository/urlRepository');
const { incrementClickCount } = urlRepo;
const Url = require('../models/url');

// Core logic to shorten URL
async function shortenUrl(originalUrl) {
    try {
        if (!originalUrl) {
            throw new Error('URL is required');
        }

        // Add http:// if missing
        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'http://' + originalUrl;
        }

        // ✅ Check if already exists
        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            return existing; // return previously saved short URL
        }

        // Generate new shortId
        const shortId = generateShortId();
        const savedUrl = await urlRepo.saveUrl(shortId, originalUrl);
        return savedUrl;

    } catch (error) {
        throw new Error(`Error shortening URL: ${error.message}`);
    }
}



// Redirection handler using shortId
async function redirectUrl(shortId) {
    try {
        const urlDoc = await getUrlByShortId(shortId);
        if (!urlDoc) {
            throw new Error('Short URL not found');
        }

        await incrementClickCount(urlDoc); // ✅ FIXED HERE

        return urlDoc.originalUrl;
    } catch (error) {
        throw new Error(`Error redirecting URL: ${error.message}`);
    }
}



// Express handler to shorten URL (used in route)
async function shortenUrlHandler(req, res, next) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const urlDoc = await shortenUrl(url); // ✅ only pass the url string

        res.json({
            shortUrl: `http://${req.get('host')}/${urlDoc.shortUrl}`,
        });

    } catch (err) {
        if (err.message.includes('invalid URL')) {
            return res.status(400).json({ error: { message: err.message } });
        }
        next(err);
    }
}


module.exports = {
    shortenUrl,
    redirectUrl,
    shortenUrlHandler,
};
