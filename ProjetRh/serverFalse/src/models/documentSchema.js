const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    nom: String,
    source: String,
    type: String,
});

module.exports = mongoose.model("document", documentSchema);
