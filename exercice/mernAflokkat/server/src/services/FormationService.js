const ObjectID = require("mongoose").Types.ObjectId;

const formationModel = require("../models/formationModel");
const { createFormationErrors } = require("../utils/errorsUtils");

// Create
module.exports.createFormation = async (req, res) => {
    const { nom, pole, dateDebut, dateFin, estCertifiante } = req.body;
    const newFormation = new formationModel({ nom, pole, dateDebut, dateFin, estCertifiante });
    try {
        const formation = await newFormation.save();
        res.send(formation);
    } catch (err) {
        const errors = createFormationErrors(err);
        res.status(200).send({ errors });
    }
};

// Read
module.exports.getAllFormation = async (_, res) => {
    try {
        const formations = await formationModel.find();
        res.send(formations);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports.getFormationById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).send("ID unknown : " + req.params.id);

    try {
        const formation = await formationModel.findById(req.params.id);
        res.send(formation);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update
module.exports.updateFormationById = async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) return res.status(404).send("ID unknown : " + id);

    try {
        const updateFormation = req.body;

        const formation = await formationModel.findByIdAndUpdate(id, { $set: updateFormation }, { new: true });

        res.send(formation);
    } catch (err) {
        res.statuts(500).json({ message: err });
    }
};

// Delete
module.exports.deleteFormationById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).send("ID unknown : " + req.params.id);

    try {
        const formation = await formationModel.findByIdAndDelete(req.params.id);
        res.send(formation);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// const getAllFormation = async (_, res) => {
//     try {
//         const formations = await formationModel.find();
//         res.send(formations);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// };

// const getFormationById = async (req, res) => {
//     if (!ObjectID.isValid(req.params.id)) return res.status(404).send("ID unknown : " + req.params.id);

//     try {
//         const formation = await formationModel.findById(req.params.id);
//         res.send(formation);
//     } catch (err) {
//         res.status(404).json({ message: err.message });
//     }
// };

// module.exports = { getAllFormation, getFormationById };

// const { getAllFormation, getFormationById } = require("../services/FormationService");
