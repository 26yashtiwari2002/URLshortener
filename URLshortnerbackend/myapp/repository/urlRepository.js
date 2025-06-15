const Url = require('../models/url');

async function saveUrl(shortId, originalUrl) {
    const newUrl = new Url({
        shortUrl: shortId,
        originalUrl: originalUrl,
    });
    return await newUrl.save();
}

async function getUrlByShortId(shortId) {
    return await Url.findOne({ shortUrl: shortId });
}

async function incrementClickCount(urlDoc) {
    urlDoc.clickCount += 1;
    return await urlDoc.save();
}

module.exports = {
    saveUrl,
    getUrlByShortId,
    incrementClickCount,
};
