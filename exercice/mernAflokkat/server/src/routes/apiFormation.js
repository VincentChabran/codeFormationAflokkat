const ExpressPromiseRouter = require("express-promise-router");

const FormationService = require("../services/FormationService");

const router = ExpressPromiseRouter();

router.post("/", FormationService.createFormation);

router.get("/", FormationService.getAllFormation);
router.get("/:id", FormationService.getFormationById);

router.put("/:id", FormationService.updateFormationById);

router.delete("/:id", FormationService.deleteFormationById);

module.exports = router;
