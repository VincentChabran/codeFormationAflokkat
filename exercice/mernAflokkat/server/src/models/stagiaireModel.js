const mongoose = require("mongoose");
const formationModel = require("./formationModel");

const stagiaireModel = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            trim: true,
        },
        prenom: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
        },
        dateDeNaissance: {
            type: Date,
            required: true,
        },
        enFormation: {
            type: formationModel.schema,
        },
    }
    // { timestamps: true }
);

module.exports = mongoose.model("stagiaire", stagiaireModel);
