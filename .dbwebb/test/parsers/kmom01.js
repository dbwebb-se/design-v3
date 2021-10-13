const HTMLParser = require('node-html-parser');
const got = require('got');

const url = process.argv[2];

(async () => {
    let repo;
    let portfolioResponse;

    try {
        const response = await got(url + "/github.txt");
        repo = response.body;
    } catch (error) {
        console.error(error.response.body);
        process.exit(1);
    }

    try {
        const response = await got(url);
        portfolioResponse = response.body;
    } catch (error) {
        console.error(error.response.body);
        process.exit(1);
    }

    process.exit(0);
})();
