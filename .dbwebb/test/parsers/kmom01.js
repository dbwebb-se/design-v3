const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    let portfolioResponse;

    if (tags.checkTag(url, 1)) {
        console.log("Correct 1.*.* tags found in GitHub repo.")
    } else {
        console.log("Tags were missing for 1.*.*, remember to tag repo.")
    }

    try {
        let response = await got(url);
        portfolioResponse = response.body;
    } catch (error) {
        console.log("No response from studentserver");
        process.exit(1);
    }

    process.exit(0);
})();
