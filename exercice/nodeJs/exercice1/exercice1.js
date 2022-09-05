const fs = require("fs");

const cleanFile = (fileData) => {
    const [match1, match2, nbVerres, ...data] = fileData.replaceAll(" ", "").split("\n");
    const [player1, player2] = match1.split("-");
    const [player3, player4] = match2.split("-");

    let cpt1 = (cpt2 = cpt3 = cpt4 = 0);
    let flag = "";

    for (let ligne of data) {
        switch (ligne) {
            case player1:
                cpt1++;
                break;
            case player2:
                cpt2++;
                break;
            case player3:
                cpt3++;
                break;
            case player4:
                cpt4++;
                break;
        }

        if (flag === "") {
            if (cpt1 >= nbVerres) {
                flag = player1;
            } else if (cpt2 >= nbVerres) {
                flag = player2;
            } else if (cpt3 >= nbVerres) {
                flag = player3;
            } else if (cpt4 >= nbVerres) {
                flag = player4;
            }
        }
    }

    console.log("Gagnant pour le match 1 = " + (cpt1 > cpt2 ? player2 : player1));
    console.log("Gagnant pour le match 2 = " + (cpt3 > cpt4 ? player4 : player3));
    console.log(`Le Grand perdant est : ${flag}`);
};

fs.readFile("exercice1_data.txt", "utf-8", (err, fileData) => {
    if (err) console.log(err);

    cleanFile(fileData);
});
