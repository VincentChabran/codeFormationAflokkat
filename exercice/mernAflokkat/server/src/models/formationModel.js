const mongoose = require("mongoose");

const formationModel = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true,
    },
    pole: {
        type: String,
        required: true,
    },
    dateDebut: {
        type: Date,
        required: true,
    },
    dateFin: {
        // 09/06/2022 mois/jour/année
        type: Date,
        required: true,
    },
    estCertifiante: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("formation", formationModel);
