const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/dbConfig");
const apiStagiaire = require("./routes/apiStagiaire");
const apiFormation = require("./routes/apiFormation");
const apiFormateur = require("./routes/apiFormateur");
const apiUser = require("./routes/apiUser");

const server = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

// Utils
server.use(bodyParser.json({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(corsOptions));

// Routes
server.use("/api/stagiaire", apiStagiaire);
server.use("/api/formation", apiFormation);
server.use("/api/formateur", apiFormateur);
server.use("/api/user", apiUser);

// Server
server.get("/", (_, res) => res.send("<h1>Hello Server Aflokkat</h1>"));
server.listen(4500, () => console.log("Server on 4500"));
