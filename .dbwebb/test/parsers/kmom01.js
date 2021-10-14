const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    if (await tags.checkTag(url, 1)) {
        console.log("Correct 1.*.* tags found in GitHub repo.\n")
    } else {
        console.log("Tags were missing for 1.*.*, remember to tag repo.\n")
    }

    // Fetching and parsing portfolio
    let portfolioChecks = false;
    try {
        const response = await got(url);
        const root = HTMLParser.parse(response.body);

        let socialLinks = root.querySelectorAll('.social a');

        for (let i = 0; i < socialLinks.length; i++) {
            let href = socialLinks[i].getAttribute("href");

            if (href !== "https://github.com/dbwebb-se/design-v3") {
                portfolioChecks = true;
                console.log("The Github-repo link has been changed.");
                break;
            }
        }

        if (portfolioChecks) {
            process.exit(0);
        }
    } catch (error) {
        console.log("No response from studentserver");
        process.exit(1);
    }

    process.exit(1);
})();
