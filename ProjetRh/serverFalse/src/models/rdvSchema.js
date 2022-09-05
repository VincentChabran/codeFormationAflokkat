const mongoose = require("mongoose");

const rdvSchema = new mongoose.Schema({
    dateCreation: {
        type: Date,
        default: Date.now,
    },
    horaire: Number,
    dateRdv: {
        type: Date,
        required: true,
    },
    dure: {
        type: Number,
        min: 0.5,
        max: 8,
    },
    validation: Boolean,
    type: String,
});

module.exports = new mongoose.model("rdv", rdvSchema);
