const express = require("express");

const apiProduit = require("./server/route/apiProduits.js");

const server = express();

server.use("/produit", apiProduit);

server.use((request, response, next) => {
    console.log(request.headers["user-agent"]);
    next();
});

server.get("/", (_, response) => {
    response.send("<h1>Bonjour User</h1><a href='/produit'><button>Produit</button></a>");
});

server.listen(3000, () => {
    console.log("Server start and listening on port 3000");
    console.log("Press Ctrl+C to quit");
});
