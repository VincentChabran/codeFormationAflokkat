const express = require("express");
const bodyParser = require("body-parser");

const apiProduct = require("./routes/apiProducts.js");
const apiTable = require("./routes/apiTable.js");

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/api/products", apiProduct);
server.use("/api/table", apiTable);

server.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

server.listen(4000, () => {
    console.log("server On port 4000");
});
