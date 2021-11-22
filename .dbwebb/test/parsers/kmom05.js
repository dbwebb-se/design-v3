const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = require("./tags.js");

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 5;

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
        const response = await got(url + "/gallery");
        const root = HTMLParser.parse(response.body);

        // Create messages array
        let messages = [];

        console.log("===================================");
        console.log("  Performing portfolio checks   ");
        console.log("===================================");

        let galleryCheck = false;
        let images = root.querySelectorAll('.main img');
        let imagesCheck = true;
        let matchCImage = /image\//gi;

        for (let i = 0; i < images.length; i++) {
            let matches = images[i].rawAttrs.match(matchCImage);

            if (!(matches && matches[0])) {
                imagesCheck = false;
                break;
            }
        }

        if (images.length > 3 && imagesCheck) {
            galleryCheck = true;
            messages.push(`\u{1F973}\t4 or more images was found in gallery and using cimage.`);
        } else {
            messages.push(`\u{1F928}\tNot enough images (less than 4) was found in gallery or cimage is not used as required.`);
        }

        let analysisCheck = false;

        try {
            const response = await got(url + "/analysis/02_load");
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
        if (tagCheck && galleryCheck && analysisCheck) {
            console.log("\n\u{1F973}\tAll checks passed.");
            process.exit(0);
        } else {
            console.log("\n\u{1F928}\tSome checks failed.");
            process.exit(1);
        }
    } catch (error) {
        console.log("\u{1F928}\tCould not find gallery-page.");
        process.exit(1);
    }
})();
