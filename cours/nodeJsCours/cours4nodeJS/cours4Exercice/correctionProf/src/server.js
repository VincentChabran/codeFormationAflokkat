const express = require("express");
const apiProduits = require("./server/routes/apiProduits.js")


const server = express();

server.use("/produits", apiProduits);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
})