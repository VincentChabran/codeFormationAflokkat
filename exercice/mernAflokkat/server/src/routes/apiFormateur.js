const ExpressPromiseRouter = require("express-promise-router");

const FormateurService = require("../services/FormateurService");

const router = ExpressPromiseRouter();

router.post("/", FormateurService.createFormateur);

router.get("/", FormateurService.getAllFormateur);
router.get("/:id", FormateurService.getFormateurById);

router.put("/:id", FormateurService.updateFormateurById);

router.delete("/:id", FormateurService.deleteFormateurById);

module.exports = router;
