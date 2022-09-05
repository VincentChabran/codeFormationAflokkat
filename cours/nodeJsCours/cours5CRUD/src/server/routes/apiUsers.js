const ExpressPromiseRouter = require("express-promise-router");
const userService = require("../services/userservice.js");

const router = ExpressPromiseRouter();

router.post("/", async (request, response) => {
    const user = request.body;
    const resultFromDb = await userService.createUser(user);
    response.json(resultFromDb);
});

router.put("/:id", (request, response) => {
    const id = request.params.id;
    // const result = userService.updateUserById(id);
    response.status(200).json();
});

router.delete("/:id", (request, response) => {
    const id = request.params.id;
    // userService.deleteUserById(id);
    response.status(204).json();
});

module.exports = router;
