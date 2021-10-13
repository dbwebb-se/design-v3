const HTMLParser = require('node-html-parser');
const got = require('got');

const url = process.argv[2];

(async () => {
    let repo;
    let portfolioResponse;

    try {
        let response = await got(url + "/github.txt");
        repo = response.body.strip();

        response = await got(repo + "/tags");

        let root = HTMLParser.parse(response);
        let boxRows = root.querySelectorAll('.Box-row');

        console.log(boxRows);
    } catch (error) {
        console.error(error.response.body);
        process.exit(1);
    }

    try {
        let response = await got(url);
        portfolioResponse = response.body;
    } catch (error) {
        console.error(error.response.body);
        process.exit(1);
    }

    process.exit(0);
})();
