const mongoose = require("mongoose");

mongoose
    .connect("mongodb://" + process.env.DB_USER_PASS + "/mern-project")
    .then(() => console.log("Connexion à MongoDb Ok"))
    .catch((err) => console.log("Erreur de connexion à MongoDb", err));
