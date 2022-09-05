const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./models/dbConfig");
const postsRoutes = require("./routes/postsController");

const app = express();

app.use(bodyParser.json());
app.use(cors()); // pour autoriser l'accès aux appels extérieur {origin: "http://localhost:3000"} dans les paranthèse pour spécifier l'accès d'une seule URL

app.use("/posts", postsRoutes);

app.listen(5500, () => console.log("Serveur On, port : 5500"));
