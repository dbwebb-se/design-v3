const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 3;
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

        try {
            const response = await got(url + "/?technology");

            messages.push("\u{1F973}\tTechnology page exists.");
            portfolioChecks = true;
        } catch (error) {
            messages.push("\u{1F928}\tTechnology page did not exist.");
            portfolioChecks = false;
        }

        let styleChecks = false;
        try {
            const configResponse = await got(url + "/config/config.yml");
            let matches = configResponse.body.match(/theme\:\s\w+/i);
            let theme = matches[0].replace("theme: ", "");

            try {
                styleResponse = await got(url + `/themes/${theme}/css/style.css`);
                styleChecks = true;
            } catch (error) {

            }

            try {
                styleResponse = await got(url + `/themes/${theme}/css/style.min.css`);
                styleChecks = true;
            } catch (error) {

            }

            if (styleChecks) {
                messages.push("\u{1F973}\tStyleSheet exists.");

                let matches = styleResponse.body.match(/display\:\s?grid/i);

                if (matches && matches[0]) {
                    messages.push("\u{1F973}\tGrid is being used.");
                } else {
                    styleChecks = false;
                    messages.push("\u{1F928}\tGrid is not being used.");
                }
            } else {
                messages.push("\u{1F928}\tStyleSheet does not exist.");
            }
        } catch (error) {
            messages.push("\u{1F928}\tCould not find config-file.");
        }

        // Output all messages
        console.log(messages.join("\n"));

        // Exit with correct status
        if (portfolioChecks && styleChecks) {
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
