const ExpressPromiseRouter = require("express-promise-router");
const userService = require("../services/userservice.js");

const router = ExpressPromiseRouter();

const users = [
    {
        id: 1,
        firstname: "Matthieu",
        lastname: "Bossennec",
        age: 33,
        mail: "matthieubossennec@gmail.com",
    },
    {
        id: 2,
        firstname: "Pierre",
        lastname: "Bossennec",
        age: 29,
        mail: "pierrebossennec@gmail.com",
    },
];

router.get("/users", (request, response) => {
    // const result = userService.getUsers();
    console.log(request.body);
    const result = users;
    response.status(200).json(result);
});

router.get("/users/:id", async (request, response) => {
    const id = request.params.id;
    const result = await userService.getUserById(id);
    console.log(result);
    // const result = users.filter(el => el.id == id);
    response.status(200).json(result);
});

module.exports = router;
