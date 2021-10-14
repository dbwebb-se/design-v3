const tags = {
    checkTag: async function checkTag(url, tag) {
        let repo;

        console.log(url);

        try {
            let response = await got(url + "/github.txt");
            repo = response.body;
        } catch (error) {
            console.log(error.message);
            console.log("Could not find github.txt file on student server.");

            return false;
        }

        try {
            let response = await got(repo + "/tags");

            let root = HTMLParser.parse(response.body);
            let boxRows = root.querySelectorAll('.Box-row');

            boxRows.forEach((tag) => {
                console.log(tag.childNodes);
            });
        } catch (error) {
            console.log("No GitHub repo found.");

            return false;
        }
    }
};

module.exports = tags;
