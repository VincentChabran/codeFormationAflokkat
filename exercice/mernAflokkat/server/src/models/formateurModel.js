const mongoose = require("mongoose");
const formationModel = require("./formationModel");

const formateurModel = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    dateDeNaissance: {
        type: Date,
        required: true,
    },
    enseigne: {
        type: formationModel.schema,
        // required: true,
    },
});

module.exports = mongoose.model("formateur", formateurModel);
