const mongoose = require("mongoose");
const formateurModel = require("./formateurModel");
const stagiaireModel = require("./stagiaireModel");

const userModel = new mongoose.Schema({
    estStagiaire: {
        type: Boolean,
        required: true,
        default: function () {
            return !this.estFormateur;
        },
    },
    estFormateur: {
        type: Boolean,
        required: true,
        default: function () {
            return !this.estStagiaire;
        },
    },
    stagiaire: {
        // On donne l'id d'un Schema, et dans le .find() on rajoute .populate("stagiaire") pour afficher corectement
        type: mongoose.SchemaTypes.ObjectId,
        ref: "stagiaire",
    },
    formateur: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "formateur",
    },
    login: {
        type: String,
        unique: true,
        required: true,
    },
    mdp: {
        type: String,
        required: true,
    },
});

userModel.s;

module.exports = mongoose.model("user", userModel);
