const fs = require("fs");

fs.readFile("exercice1_data.txt", "utf-8", (err, fileData) => {
    if (err) {
        console.log(err);
    } else {
        const [match1, match2, nbVerres, ...reste] = fileData.split("\n");
        let tableau = [];
        reste.forEach((elem) => tableau.push(elem.trim()));

        let cptblue = (cptyellow = cptgreen = cptred = 0);

        tableau.forEach((el) => {
            if (el == "blue") {
                cptblue += 1;
                if (cptblue == nbVerres && cptyellow < nbVerres) {
                    console.log("Joueur jaune gagnant !");
                }
            } else if (el == "yellow") {
                cptyellow += 1;
                if (cptyellow == nbVerres && cptblue < nbVerres) {
                    console.log("Joueur bleu gagnant !");
                }
            } else if (el == "green" && cptred < 10) {
                cptgreen += 1;
                if (cptgreen == nbVerres && cptred < nbVerres) {
                    console.log("Joueur rouge gagnant !");
                }
            } else {
                cptred += 1;
                if (cptred == nbVerres && cptgreen < nbVerres) {
                    console.log("Joueur vert gagnant !");
                }
            }
        });

        console.log(cptblue, cptyellow, cptgreen, cptred);
    }
});
