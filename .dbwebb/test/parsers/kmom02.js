const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 2;
    if (await tags.checkTag(url, versionTag)) {
        console.log(`\u{1F973}\tCorrect ${versionTag}.*.* tags found in GitHub repo.\n`);
    } else {
        console.log(`\u{1F928}\tTags were missing for ${versionTag}.*.*, remember to tag repo.\n`);
    }

    // Fetching of config.yml and style.scss files
    console.log("===================================");
    console.log("  Performing theme checks   ");
    console.log("===================================");
    try {
        const configResponse = await got(url + "/config/config.yml");
        let matches = configResponse.body.match(/theme:\s\w+/i);
        let theme = matches[0];

        const scssResponse = await got(`${url}/themes/${theme}/scss/style.scss`);

        console.log("###   style.scss   ###");
        console.log(scssResponse);
    } catch (error) {
        console.log("\u{1F928}\tNo theme was found on studentserver.");
    }

    // Fetching and parsing portfolio
    let portfolioChecks = false;

    // Create messages array
    let messages = [];

    console.log("\n===================================");
    console.log("    Performing portfolio checks    ");
    console.log("===================================");

    try {
        const response = await got(url + "/about");
        
        messages.push("\u{1F973}\About page exists.");
        portfolioChecks = true;
    } catch (error) {
        messages.push("\u{1F928}\tAbout page did not exist.");
    }

    // Output all messages
    console.log(messages.join("\n"));


    console.log("\n===================================");
    console.log("    Summary    ");
    console.log("===================================");

    // Exit with correct status
    if (portfolioChecks) {
        console.log("\u{1F973}\tAll checks passed.");
        process.exit(0);
    } else {
        console.log("\u{1F928}\tSome checks failed.");
        process.exit(1);
    }
})();
