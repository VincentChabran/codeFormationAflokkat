const {error} = require("console");
const fs = require("fs");

const passerCommande = (drink, menu, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (menu.includes(drink)) {
                // include renvoi true si l'élem drink est dans menu
                resolve("Commande Ok " + drink);
            } else {
                let err = new Error("Lis bien la carte fdp");
                err.menu = menu;
                reject(err);
            }
        }, time);
    });
};

const main = (menu, commande) => {
    for (let elem of commande) {
        passerCommande(elem.drink, menu, 3000)
            .then((result) => console.log(result))
            .catch((error) => {
                console.log(error.menu);
                passerCommande(
                    error.menu[Math.floor(Math.random() * 3)],
                    menu,
                    0
                )
                    .then((result) => console.log(result + " 2eme service"))
                    .catch((error) => console.log(error.message));
            });
    }
};

fs.readFile("exercice3_data.txt", "utf-8", (error, fileData) => {
    if (error) throw error;

    const dataJson = JSON.parse(fileData);

    menu = dataJson.data[0].availableDrinks;
    [, ...commande] = dataJson.data;

    main(menu, commande);
});
