const ObjectID = require("mongoose").Types.ObjectId;

const formationModel = require("../models/formationModel");
const stagiaireModel = require("../models/stagiaireModel");

class StagiaireService {
    // Create
    async createStagiaire(req, res) {
        const { nom, prenom, age, dateDeNaissance, enFormation } = req.body;

        try {
            const linkedFormation = await formationModel.findById(enFormation);
            const newStagiaire = new stagiaireModel({
                nom,
                prenom,
                age,
                dateDeNaissance,
                enFormation: linkedFormation,
            });
            newStagiaire.save((err, docs) => (!err ? res.send(docs) : console.log("Error" + err)));
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }

    // Read
    async getAllStagiaire(_, res) {
        try {
            const stagiaires = await stagiaireModel.find();
            res.send(stagiaires);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async getStagiaireById(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

        try {
            const stagiaire = await stagiaireModel.findById(req.params.id);
            res.send(stagiaire);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // Update
    async updateStagiaireById(req, res) {
        const { id } = req.params;
        if (!ObjectID.isValid(id)) return res.status(404).send("ID unknown : " + id);
        try {
            const updateStagiaire = req.body;

            if (req.body.enFormation) {
                const updateFormation = formationModel.findById(req.body.enFormation);
                updateStagiaire.enFormation = updateFormation;
            }
            const stagiaire = await stagiaireModel.findByIdAndUpdate(id, { $set: updateStagiaire }, { new: true });
            res.send(stagiaire);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    // Delete
    async deleteStagiaireById(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

        try {
            const stagiaire = await stagiaireModel.findByIdAndDelete(req.params.id);
            res.send(stagiaire);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
}

module.exports = new StagiaireService();
