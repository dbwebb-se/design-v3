import HTMLParser from 'node-html-parser';
import got from 'got';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

import tags from "./tags.js";

const url = process.argv[2];

(async () => {
    // Testing for tags on github
    console.log("===================================");
    console.log("  Performing tags checks   ");
    console.log("===================================");
    const versionTag = 6;

    let tagCheck = false;
    if (await tags.checkTag(url, versionTag)) {
        console.log(`\u{1F973}\tCorrect ${versionTag}.*.* tags found in GitHub repo.\n`);
        tagCheck = true;
    } else {
        console.log(`\u{1F928}\tTags were missing for ${versionTag}.*.*, remember to tag repo.\n`);
    }

    try {
        console.log(`===================================
   Performing accesibility checks
   (Might take a while)
===================================`);

        let a11yCheck = false;

        const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
        const options = { output: 'json', onlyCategories: ['accessibility'], port: chrome.port, quiet: true };
        const indexResult = await lighthouse(url, options);

        let indexScore = indexResult.lhr.categories.accessibility.score;

        console.log("\tAccessibility score of index: " + (indexScore * 100));

        const galleryResult = await lighthouse(url + "/gallery", options);

        let galleryScore = galleryResult.lhr.categories.accessibility.score;

        console.log("\tAccessibility score of gallery: " + (galleryScore * 100));

        const techResult = await lighthouse(url + "/technology", options);

        let techScore = techResult.lhr.categories.accessibility.score;

        console.log("\tAccessibility score of technology: " + (techScore * 100));

        if (indexScore === 1.0 &&
                galleryScore === 1.0 &&
                techScore === 1.0) {
            console.log("\n\u{1F973}\tAccessibility score equal to 100.");
            a11yCheck = true;
        } else {
            console.log("\n\u{1F928}\tAccessibility score less than 100.");
        }

        await chrome.kill();

        console.log("\n===================================");
        console.log("  Summary    ");
        console.log("===================================");

        // Exit with correct status
        if (tagCheck && a11yCheck) {
            console.log("\n\u{1F973}\tAll checks passed.");
            process.exit(0);
        } else {
            console.log("\n\u{1F928}\tSome checks failed.");
            process.exit(1);
        }
    } catch (error) {
        console.error(error);
        console.log("\u{1F928}\tCould not find page.");
        process.exit(1);
    }
})();
