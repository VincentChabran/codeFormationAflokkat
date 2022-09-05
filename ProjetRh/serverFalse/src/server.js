const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const apiUser = require("./routes/apiUser.js");

const server = express();

// Front End fichier , pour avoir accès au feuille de style + img
server.use(express.static("frontEnd"));
server.use("/styles", express.static(__dirname + "/frontEnd/styles"));
server.use("/js", express.static(path.join(__dirname + "/frontEnd/js")));
server.use("/img", express.static(__dirname + "/frontEnd/img"));
//

// Utils
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors("http://localhost:3000"));

// Api Lien
server.use("/apiUser", apiUser);
server.get("/apiUser", (_, res) => res.sendFile(__dirname + "/frontEnd/html/apiUser.html"));

// Accueil Serveur
server.get("/", (_, res) => res.sendFile(__dirname + "/frontEnd/html/serveurAccueil.html"));
// server.get("/", (_, res) => res.sendFile(__dirname + "/frontEnd/html/apiUser.html"));

server.listen(4000, () => console.log("Serveur on, Port : 4000"));
