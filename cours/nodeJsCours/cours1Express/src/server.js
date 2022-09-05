const express = require("express");
// const cors = require("cors");

const apiFormation = require("./server/route/apiFormation.js");

const server = express();

server.use((request, response, next) => {
    console.log(request.headers["user-agent"]);
    next();
});

server.use("/formation", apiFormation);

server.get("/", (request, response) => {
    response.send('<h1>Bonjour Aflokkat</h1><a href="/hello">Version Anglaise</a>');
});

server.get("/hello", (request, response) => {
    response.send('<h1>Hello Aflokkat</h1><a href="/">Version Francaise</a>');
});

server.listen(3000, () => {
    console.log("Server start and listening on port 3000");
    console.log("Press Ctrl+C to quit");
});
