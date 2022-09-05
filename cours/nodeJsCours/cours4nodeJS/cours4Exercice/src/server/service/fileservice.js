const fs = require("fs");

const racine = "./src/static/";

class fileDataServiceCsv {
    /**
     * @param {*} fileData le fichier CSV
     * @returns Tableau d'objet
     */
    cleanData(fileData) {
        const [clef, ...data] = fileData.trim().replace("-", "").split("\n");
        const key = clef.split(",");
        const valeur = [];
        data.forEach((element) => valeur.push(element.split(",")));

        const fileJson = [];

        for (let i in valeur) {
            let obj = {};
            for (let j in valeur[i]) {
                obj[key[j]] = valeur[i][j];
            }
            fileJson.push(obj);
        }
        // console.log(JSON.stringify(fileJson));
        return fileJson;
    }

    readFile(fichierNom) {
        return new Promise((resolve, reject) => {
            const cheminFichier = racine + fichierNom;
            fs.readFile(cheminFichier, "utf-8", (error, fileData) => {
                if (error) reject(error);

                const dataJson = this.cleanData(fileData);

                resolve(dataJson);
            });
        });
    }

    async getJsonFile(fichierNom) {
        return await this.readFile(fichierNom);
    }

    async getSousType(soustype, fichierNom) {
        const dataJson = await this.getJsonFile(fichierNom);
        const result = [];

        for (let ligne of dataJson) {
            if (ligne["soustype"] == soustype) {
                result.push(ligne);
            }
        }
        return result;
    }
}

// const fichier = new fileDataServiceCsv();
// fichier.getSousType("dessert", "produits.csv");

module.exports = new fileDataServiceCsv();
