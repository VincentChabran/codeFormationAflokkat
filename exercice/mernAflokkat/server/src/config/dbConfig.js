const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/aflokkat")
    .then(() => console.log("Connexion MongoDb ok"))
    .catch((err) => console.log("Erreur de connexion a mongoDb " + err));
