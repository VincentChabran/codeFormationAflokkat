const EpressPromiseRouter = require("express-promise-router");
const Product = require("../services/product.js");

const router = EpressPromiseRouter();

// Racine
router.get("/", async (req, res) => {
    const result = await Product.getAll();
    res.status(200).json(result);
});

// Récupére par rapport a l'ID  route = /api/products/+1 ou 2 ou etc
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await Product.getById(id);
    res.status(200).json(result);
});

// Récupére par rapport au type  route = /api/products/type/+plat ou boisson
router.get("/type/:type", async (req, res) => {
    const type = req.params.type;
    const result = await Product.getByType(type);
    res.status(200).json(result);
});

// Récupére par rapport au subtype  route = /api/products/subtype/+principal ou etc
router.get("/subtype/:subtype", async (req, res) => {
    const subtype = req.params.subtype;
    const result = await Product.getBySubtype(subtype);
    res.status(200).json(result);
});

// Insére dans la DB
router.get("/fillDatabase", async (req, res) => {
    const result = await Product.fillDatabase("produits.csv");
    res.status(200).json(result);
});

module.exports = router;
