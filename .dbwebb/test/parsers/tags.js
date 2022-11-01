const HTMLParser = require('node-html-parser');
const got = require('got');

const tags = {
    checkTag: async function checkTag(url, tag) {
        let tagsCheck = false;
        let repo;

        try {
            let response = await got(url + "/github.txt");
            repo = response.body;
        } catch (error) {
            console.log("Could not find github.txt file on student server.");
        }

        console.log("Checking for tags on repo: " + repo);

        try {
            let response = await got(repo + "/tags");

            let root = HTMLParser.parse(response.body);
            let tagsH4 = root.querySelectorAll('.f4.d-inline a');

            for (let i = 0; i < tagsH4.length; i++) {
                let hrefArray = tagsH4[i].getAttribute("href").split("/");
                let re = new RegExp("v" + tag);

                if (hrefArray[hrefArray.length - 1].match(re)) {
                    tagsCheck = true;
                    break;
                }
            }
        } catch (error) {
            console.log("No GitHub repo found.");
        }

        return tagsCheck;
    }
};

module.exports = tags;
