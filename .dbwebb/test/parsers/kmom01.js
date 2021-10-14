const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    if (await tags.checkTag(url, 1)) {
        console.log("\u{1F973}\tCorrect 1.*.* tags found in GitHub repo.\n")
    } else {
        console.log("\u{1F928}\tTags were missing for 1.*.*, remember to tag repo.\n")
    }

    // Fetching and parsing portfolio
    let portfolioChecks = false;
    // Create messages array
    let messages = [];

    try {
        const response = await got(url);
        const root = HTMLParser.parse(response.body);

        console.log("===================================");
        console.log("  Performing portfolio checks   ");
        console.log("===================================");

        // Checks for changed social link
        let socialLinks = root.querySelectorAll('.social a');
        for (let i = 0; i < socialLinks.length; i++) {
            let href = socialLinks[i].getAttribute("href");

            if (href !== "https://github.com/dbwebb-se/design-v3") {
                portfolioChecks = true;
                messages.push("\u{1F973}\tThe Github-repo link has been changed.");
                break;
            }
        }

        if (!portfolioChecks) {
            messages.push("\u{1F928}\tThe Github-repo link has not been changed.");
        }

        // Checks for changed image in logo
        let logo = root.querySelector('.logo a img');
        let srcArray = logo.getAttribute("src").split("/");
        if (srcArray[srcArray.length - 1] !== "leaf_256x256.png") {
            messages.push("\u{1F973}\tThe logo image link has been changed.");
        } else {
            portfolioChecks = false;
            messages.push("\u{1F928}\tThe logo image link has not been changed.");
        }

        // Checks for own theme
        let linksInHeader = root.querySelectorAll('link[rel="stylesheet"]');
        let mainStyle = linksInHeader[linksInHeader.length - 1];
        let hrefArray = mainStyle.getAttribute("href").split("/");
        let themeFolder = hrefArray[hrefArray.length - 3];

        if (themeFolder !== "example") {
            messages.push("\u{1F973}\tThe theme has been changed.");
        } else {
            portfolioChecks = false;
            messages.push("\u{1F928}\tThe theme has not been changed.");
        }
    } catch (error) {
        messages.push("No response from studentserver");
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
