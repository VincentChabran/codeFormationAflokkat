const fs = require("fs");
const { waitForDebugger } = require("inspector");

const passerCommande = (menu, people) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (menu.includes(people.drink)) {
                resolve(`Voici votre ${people.drink} , ${people.name}`);
            } else {
                const error = new Error(
                    `${people.name}, votre commande est non disponible, veuillez choisir entre ${menu}`
                );
                error.menu = menu;
                error.name = people.name;
                reject(error);
            }
        }, 2000);
    });
};

const traitement = (fileData) => {
    dataJson = JSON.parse(fileData);
    const [menuBrut, ...people] = dataJson.data;
    const menu = menuBrut.availableDrinks;

    // for (let ligne of people) {
    //     passerCommande(menu, ligne)
    //         .then((result) => console.log(result))
    //         .catch((err) => {
    //             console.log(err.message);
    //             let obj = {
    //                 name: err.name,
    //                 drink: menu[Math.floor(Math.random() * 4)],
    //             };
    //             passerCommande(menu, obj).then((result) => console.log(result));
    //         });
    // }

    people.forEach(async (ligne) => {
        try {
            const result = await passerCommande(menu, ligne);
            console.log(result);
        } catch (error) {
            console.log(error.message);
            let obj = {
                name: error.name,
                drink: menu[Math.floor(Math.random() * 4)],
            };
            console.log(await passerCommande(menu, obj));
        }
    });
};

fs.readFile("exercice3_data.txt", "utf-8", (err, fileData) => {
    if (err) throw err;

    traitement(fileData);
});
