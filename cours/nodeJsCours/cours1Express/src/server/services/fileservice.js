const fs = require("fs");

const path = "./src/static/";

class fileDataService {
    myReadFile(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path + filename;
            fs.readFile(filePath, "UTF-8", (error, fileData) => {
                if (error) reject(error);

                resolve(fileData);
            });
        });
    }

    async getJsonFile(filename) {
        const result = await this.myReadFile(filename);
        const resultJson = JSON.parse(result);

        return resultJson;
    }
}

module.exports = new fileDataService();
