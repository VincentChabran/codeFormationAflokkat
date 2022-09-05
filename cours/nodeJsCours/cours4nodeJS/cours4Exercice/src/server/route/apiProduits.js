const ExpressPromiseRouter = require("express-promise-router");
const fileService = require("../service/fileservice.js");

const router = ExpressPromiseRouter();

router.get("/", async (req, res) => {
    const result = await fileService.getJsonFile("produits.csv");

    let desciptionHtml = "<table border='3'>";

    for (let ligne of result) {
        let temporaire = "<tr>";

        for (let [key, value] of Object.entries(ligne)) {
            let ajout = `<td>${key} = ${value}</td>`;
            temporaire += ajout;
        }
        temporaire += "</tr>";
        desciptionHtml += temporaire;
    }
    desciptionHtml += "</table>";
    res.send(
        desciptionHtml +
            "<a href='/produit/boisson'><button>Boisson</button></a> <a href='/produit/plat'><button>Plat</button></a> <br> " +
            JSON.stringify(result)
    );
    // res.status(200).json(result);
});

router.get("/boisson", async (req, res) => {
    const result = await fileService.getJsonFile("produits.csv");
    let desciptionHtml = "<table border='3'>";
    let cptBoisson = 0;
    for (let ligne of result) {
        if (ligne["type"] == "boisson") {
            let temporaire = "<tr>";

            for (let [key, value] of Object.entries(ligne)) {
                let ajout = `<td>${key} = ${value}</td>`;
                temporaire += ajout;
            }
            temporaire += "</tr>";
            desciptionHtml += temporaire;
            cptBoisson++;
        }
    }
    desciptionHtml += "</table> <a href='/produit'><button>Retour</button></a> <br>";
    res.send(desciptionHtml + `Total Boisson ${cptBoisson}`);
});

router.get("/plat", async (req, res) => {
    const result = await fileService.getJsonFile("produits.csv");
    let descriptionHtml = "<p>";
    let cptPlat = 0;
    for (let ligne of result) {
        if (Object.getOwnPropertyDescriptor(ligne, "type").value == "plat") {
            for (let [key, value] of Object.entries(ligne)) {
                let ajout = `<strong>${key}</strong> = ${value}  `;
                descriptionHtml += ajout;
            }
            descriptionHtml += "<br>";
            cptPlat++;
        }
    }
    descriptionHtml += "</p> <a href='/produit'><button>Retour</button></a> <br>";
    res.send(descriptionHtml + `Total de Plat ${cptPlat}`);
});

router.get("/soustype/:type", async (req, res, next) => {
    // ultisier un obj.filter(el => el.proprieter === valeur souhaiter) pour renvoyer si la proprieter d'un obj === une valeur
    const soustype = req.params.type;
    const result = await fileService.getSousType(soustype, "produits.csv");
    let desciptionHtml = "<p>";
    for (let ligne of result) {
        for (let [key, value] of Object.entries(ligne)) {
            let ajout = `<strong>${key}</strong> = ${value}  `;
            desciptionHtml += ajout;
        }
        desciptionHtml += "<br>";
    }
    desciptionHtml += "</p> <a href='/produit'><button>Retour</button></a> <br>";
    res.send(desciptionHtml);
});

router.get("/test", (request, response) => {
    // request.query renvoi un objet
    // récup les infos après ? dans l'url: ex = /test?nom=vincent&age=26
    const nom = request.query.nom;
    const age = request.query.age;
    console.log(nom, age);
    console.log(request.query);
    response.send(`<p>Nom = ${nom} , Age = ${age} , Objet request.query = ${request.query}`);
});

router.use((request, response, next) => {
    console.log(request.headers["user-agent"]);
    response.status(422).send("Type is not defined ");
    next();
});

module.exports = router;
