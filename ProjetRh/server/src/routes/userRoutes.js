const ExpressPromiseRouter = require("express-promise-router");

const UserController = require("../controllers/userController");

const router = ExpressPromiseRouter();

// Crud
router.post("/", UserController.createUser);

router.get("/", UserController.readUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
