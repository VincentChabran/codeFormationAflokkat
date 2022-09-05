const fs = require("fs");

const chemin = "./src/data/";

class fileDataServiceCsv {
    readFile(nomFichier) {
        return new Promise((resolve, reject) => {
            const fichier = chemin + nomFichier;
            fs.readFile(fichier, "utf-8", (err, fileData) => {
                if (err) reject(err);

                const result = this.cleanData(fileData);

                resolve(result);
            });
        });
    }

    cleanData(fileData) {
        const data = fileData.trim().replace("-", "").split("\n");
        const [keysBrut, ...valeur] = data;
        const keys = keysBrut.split(",");

        let result = [];

        for (let i in valeur) {
            const obj = {};
            const ligne = valeur[i].split(",");
            for (let j in keys) {
                obj[keys[j]] = ligne[j];
            }
            result.push(obj);
        }
        return result;
    }

    async getJsonFile(nomFichier) {
        return await this.readFile(nomFichier);
    }

    async getTypeBoisson(nomFichier) {
        const resultJson = await this.readFile(nomFichier);
        let boissons = [];

        for (let ligne of resultJson) {
            if (ligne["type"] == "boisson") {
                boissons.push(ligne);
            }
        }
        return boissons;
    }
    async writeBoisson(nomFichier) {
        const boissons = await this.getTypeBoisson(nomFichier);
        let description = "<table border='2'>";
        for (let ligne of boissons) {
            let temp = "<tr>";
            for (let [key, value] of Object.entries(ligne)) {
                temp += `<td>${key} = ${value}`;
            }
            description += temp + "</tr>";
        }
        description += "</table>";
        return description;
    }

    async getTypePlat(nomFichier) {
        const resultJson = await this.readFile(nomFichier);
        let plats = [];

        for (let ligne of resultJson) {
            if (ligne["type"] == "plat") {
                plats.push(ligne);
            }
        }
        return plats;
    }
    async writePlat(nomFichier) {
        const plats = await this.getTypePlat(nomFichier);
        let description = "<table border='2'>";
        for (let ligne of plats) {
            let temp = "<tr>";
            for (let [key, value] of Object.entries(ligne)) {
                temp += `<td>${key} = ${value}`;
            }
            description += temp + "</tr>";
        }
        description += "</table>";
        return description;
    }
}

const test = new fileDataServiceCsv();
test.writeBoisson("produits.csv");

module.exports = new fileDataServiceCsv();
