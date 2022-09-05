const express = require("express");
const apiProduit = require("./server/route/apiProduits.js");

const server = express();

server.use("/produit", apiProduit);

server.get("/", (req, res) => {
    res.send("<h1>Bonjour User</h1><a href='/produit'><button>Produit</button></a>");
});

server.listen(4000, () => {
    console.log("Server Start port 3000");
});
