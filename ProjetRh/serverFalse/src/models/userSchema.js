const mongoose = require("mongoose");
const documentSchema = require("./documentSchema");
const rdvSchema = require("./rdvSchema");

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        nom: {
            type: String,
            maxlength: 60,
            trim: true,
        },
        prenom: {
            type: String,
            maxlength: 60,
            trim: true,
        },
        nivAutorisation: Number,
        // listeDoc: [documentSchema],
        // listeRdv: [rdvSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
