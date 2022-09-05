const { Router } = require("express");
const ExpressPromiseRouterr = require("express-promise-router");
const fileService = require("../services/fileservice");

const router = ExpressPromiseRouterr();

router.get("/", (request, response) => {
    //
    const filename = request.query.filename;
    console.log(filename);

    let result = {
        name: filename,
        exist: filename != null,
    };

    response.status(200).json(result);
});

router.get("/data", async (request, response) => {
    const filename = request.query.filename;
    console.log(request.query);

    const result = await fileService.getJsonFile(filename);

    response.status(200).json(result);
});

router.get("/class/:classType", async (request, response) => {
    const classType = request.params.classType;
    console.log(classType);

    const result = await fileService.getJsonFile("formation.json");
    response.status(200).json(result.data[classType]);
});

module.exports = router;
