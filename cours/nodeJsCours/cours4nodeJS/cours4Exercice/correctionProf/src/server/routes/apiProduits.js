const ExpressPromiseRouter = require("express-promise-router");
const fileService = require("../services/fileservice.js");

const router = ExpressPromiseRouter();

router.get("/", async (request, response) => {
  // Récupérer le filename dans la query
  // localhost:3000/produits/?filename=produits.csv
  const filename = request.query.filename;
  // Appeler le service fileservice et recuperer les données en JSON
  const data = await fileService.get(filename, "all");
  // Renvoyer les données
  response.status(200).json(data);
});

router.get("/:type", async (request, response) => {
  try {
    const type = request.params.type;
    const filename = request.query.filename;
    const data = await fileService.get(filename, type);
    response.status(200).json(data);
  } catch(error) {
    response.status(error.status).send({error: error.message});
  }
});


module.exports = router;