// External Modules
const express = require("express");
const bodyParser = require("body-parser");
// Internal
const apiUsers = require("./server/routes/apiUsers.js");
const apiPublic = require("./server/routes/apiPublic.js");
const logMiddleware = require("./server/middleware/logMiddleware.js");

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// server.use(logMiddleware());

server.use("/public", apiPublic);
server.use("/api/users", apiUsers);

server.listen(3000, () => {
    console.log("Server started");
    console.log("Server is listening on port 3000");
    console.log("Press Ctrl+C to quit");
});
