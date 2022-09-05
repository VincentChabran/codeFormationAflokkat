const fs = require("fs");
const Joueur = require("./joueur");

const cleanFile = (fileData) => {
    dataJson = JSON.parse(fileData);
    // const rules = dataJson.rules;
    // const [joueurs, ...data] = dataJson.data;
    const { rules, data } = dataJson;
    const [noms, ...parties] = data;

    const joueurs = {};

    for (let [key, value] of Object.entries(noms)) {
        joueurs[key] = {
            nom: value,
            score: 0,
        };
    }

    for (let partie of parties) {
        for (let [key, val] of Object.entries(partie)) {
            joueurs[key].score += rules[val - 1];
        }
    }

    return joueurs;
};

fs.readFile("exercice2_data.txt", "utf-8", (err, fileData) => {
    if (err) throw err;

    const result = cleanFile(fileData);

    const joueur = new Joueur(result, "blue");

    // console.log(Object.entries(result));
    console.log(joueur.setClassement2());
});
