const ExpressPromiseRouter = require("express-promise-router");

const StagiaireService = require("../services/StagiaireService");

const router = ExpressPromiseRouter();

router.post("/", StagiaireService.createStagiaire);

router.get("/", StagiaireService.getAllStagiaire);
router.get("/:id", StagiaireService.getStagiaireById);

router.put("/:id", StagiaireService.updateStagiaireById);

router.delete("/:id", StagiaireService.deleteStagiaireById);

module.exports = router;
