const mongoose = require("mongoose");

mongoose
    .connect("mongodb://" + process.env.DB_USER_PASS + "/projetRh")
    .then(() => console.log("Connected to mongoDb success"))
    .catch((err) => console.log("Error to connect mongoDb", err));
