const mongoose = require("mongoose");

const congeSchema = mongoose.Schema({
    dateDemande: {
        type: Date,
        default: Date.now,
    },
    dateDebut: Date,
    dateFin: Date,
    validation: Boolean,
});

module.exports = new mongoose.model("conge", congeSchema);
