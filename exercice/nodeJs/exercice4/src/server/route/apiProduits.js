const ExpressPromiseRouter = require("express-promise-router");
const fileService = require("../service/fileService.js");

const router = ExpressPromiseRouter();

router.get("/", async (request, response) => {
    const result = await fileService.getJsonFile("produits.csv");

    let description = "<table border='2'>";
    for (let ligne of result) {
        let temp = "<tr>";
        for (let [key, value] of Object.entries(ligne)) {
            temp += `<td> ${key} = ${value} </td>`;
        }
        temp += "</tr>";
        description += temp;
    }
    description += "</table>";

    response.send(
        description +
            "<a href='/produit/boisson'><button>Boisson</button></a> <a href='/produit/plat'><button>Plat</button></a><br> "
    );
});

router.get("/boisson", async (request, response) => {
    const result = await fileService.writeBoisson("produits.csv");
    response.send(result + " <a href='/produit'><button>Retour</button></a>");
});

router.get("/plat", async (request, response) => {
    const result = await fileService.writePlat("produits.csv");
    response.send(result + " <a href='/produit'><button>Retour</button></a>");
});

module.exports = router;
