const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 6;
    if (await tags.checkTag(url, versionTag)) {
        console.log(`\u{1F973}\tCorrect ${versionTag}.*.* tags found in GitHub repo.\n`);
    } else {
        console.log(`\u{1F928}\tTags were missing for ${versionTag}.*.*, remember to tag repo.\n`);
    }

    // Fetching and parsing portfolio
    let portfolioChecks = false;

    try {
        const response = await got(url);
        const root = HTMLParser.parse(response.body);

        // Create messages array
        let messages = [];

        console.log("===================================");
        console.log("  Performing portfolio checks   ");
        console.log("===================================");



        // Output all messages
        console.log(messages.join("\n"));

        // Exit with correct status
        if (portfolioChecks) {
            console.log("\n\u{1F973}\tAll checks passed.");
            process.exit(0);
        } else {
            console.log("\n\u{1F928}\tSome checks failed.");
            process.exit(1);
        }
    } catch (error) {
        console.log(error.message);
        console.log("\u{1F928}No response from studentserver");
        process.exit(1);
    }
})();
