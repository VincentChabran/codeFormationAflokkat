const ExpressPromiseRouter = require("express-promise-router");

const UserService = require("../services/UserService");

const router = ExpressPromiseRouter();

router.post("/", UserService.createUser);

router.get("/", UserService.getAllUser);
// router.get("/:id", UserService.getUserById);

router.put("/:id", UserService.updateUser);

router.delete("/:id", UserService.deleteUser);

module.exports = router;
