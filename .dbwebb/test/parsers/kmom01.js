const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    let portfolioResponse;

    let tagsCheck = tags.checkTag(url, 1);

    try {
        let response = await got(url);
        portfolioResponse = response.body;
    } catch (error) {
        console.log("No response from studentserver");
        process.exit(1);
    }

    process.exit(0);
})();
