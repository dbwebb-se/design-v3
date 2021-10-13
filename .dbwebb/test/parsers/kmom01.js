const HTMLParser = require('node-html-parser');
const got = require('got');

const url = process.argv[2];

(async () => {
    try {
        const response = await got(url);
        console.log(response.body);
    } catch (error) {
        console.log(error.response.body);
    }
})();
