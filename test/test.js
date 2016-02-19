const webpInfo = require('../index');
const path = require('path');

webpInfo(path.join(__dirname, './test.webp'), (err, result) => {
    if (err) return console.warn(err);
    console.log(JSON.stringify(result, null, 2));
});