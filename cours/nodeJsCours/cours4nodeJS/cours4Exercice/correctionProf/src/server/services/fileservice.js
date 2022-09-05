const fs = require("fs");
const csv = require("csvtojson");

const path = "./src/server/static/";
const availableTypes = ["plat", "boisson", "all"];

class FileService {
    myReadFile(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path + filename;
            fs.readFile(filePath, "utf-8", (error, fileData) => {
                if (error) reject(error);
                resolve(fileData);
            });
        });
    }

    async convertToJson(filename) {
        const fileData = await this.myReadFile(filename);
        const fileLines = fileData.replace("-", "").split("\n");
        const [keysLine, ...produits] = fileLines;
        const keys = keysLine.split(",");
        let result = [];
        for (let produit of produits) {
            const jsonProduct = {};
            // Remplir l'obj
            produit.split(",").forEach((el, index) => {
                jsonProduct[keys[index]] = el;
            });
            result.push(jsonProduct);
        }
        return result;
    }

    async get(filename, type) {
        if (!availableTypes.includes(type)) {
            const error = new Error();
            error.status = 422;
            error.message = "Unprocessable entity";
            throw error;
        }
        const jsonData = await this.convertToJson(filename);
        // const jsonData = await csv().fromFile(path+filename);

        if (type === "all") return jsonData;
        const result = jsonData.filter((el) => el.type === type);
        return result;
    }
}

module.exports = new FileService();
