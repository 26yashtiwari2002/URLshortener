const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        unique: true,
        required: true,
    },
    originalUrl: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 2, // ⏱ 2 days in seconds (172800)
    },
    clickCount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Url', urlSchema);
