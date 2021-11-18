const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 4;

    let tagCheck = false;
    if (await tags.checkTag(url, versionTag)) {
        console.log(`\u{1F973}\tCorrect ${versionTag}.*.* tags found in GitHub repo.\n`);
        tagCheck = true;
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

        let linkCheck = false;
        let themeLink = root.querySelector('a[href=?action=theme]');

        if (themeLink) {
            linkCheck = true;
            messages.push(`\u{1F973}\tDark theme link was found.`);
        } else {
            messages.push(`\u{1F928}\tDark theme link was not found.`);
        }

        let analysisCheck = false;

        try {
            const response = await got(url + "/analysis/01_colors");
            analysisCheck = true;
            messages.push(`\u{1F973}\tAnalysis page found.`);
        } catch(error) {
            messages.push(`\u{1F928}\tAnalysis was not page found.`);
        }

        // Output all messages
        console.log(messages.join("\n"));

        console.log("\n===================================");
        console.log("  Summary    ");
        console.log("===================================");

        // Exit with correct status
        if (tagCheck && linkCheck && analysisCheck) {
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
