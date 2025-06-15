const { nanoid } = require('nanoid');

function generateShortId() {
    return nanoid(4); // 
}

module.exports = { generateShortId };
