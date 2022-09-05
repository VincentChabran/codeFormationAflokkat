const ExpressPromiseRouter = require("express-promise-router");
const Product = require("../services/product.js");
const Table = require("../services/table.js");

const router = ExpressPromiseRouter();

// Affiche toute les tabes route = /api/table/
router.get("/", async (req, res) => {
    const result = await Table.getAll();
    res.status(200).json(result);
});

// Affiche la Table tableProduct  route = /api/table/tableproduct
router.get("/tableproduct", async (req, res) => {
    const result = await Table.getAllTableProduct();
    res.status(200).json(result);
});

// Affiche la recette du restaurant  route = /api/table/bill
router.get("/bill", async (req, res) => {
    const result = await Table.getGlobalPrice();
    res.status(200).json(result);
});

// Affiche le total de la table spécifique
router.get("/bill/:id", async (req, res) => {
    const idTable = req.params.id;
    const prix = await Table.getTotalPrice(idTable);
    res.status(200).send(`<h1> Le Total de la Table id : ${idTable} = ${prix} €</h1>`);
});

// Affiche le bill + tous les produits de la table  route = /api/table/1
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await Table.getById(id);
    res.status(200).json(result);
});

// Crée une table du restaurant dans la BDD
router.post("/", async (req, res) => {
    const table = req.body;
    await Table.create();
});

router.put("/:id", async (req, res) => {
    const idTable = req.params.id;
    const idProduit = req.body.id;
    await Product.addProducts(idTable, idProduit);
});

module.exports = router;
