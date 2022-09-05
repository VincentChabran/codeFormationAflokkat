const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");

const server = express();

// Utils
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Routes
server.use("/user", userRoutes);

//
server.get("/", (_, res) => res.send("hello world"));
server.listen(process.env.PORT, () => console.log(`Server Up, Port : ${process.env.PORT}`));
