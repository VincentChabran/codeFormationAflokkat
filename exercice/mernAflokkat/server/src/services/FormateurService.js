const ObjectID = require("mongoose").Types.ObjectId;

const formateurModel = require("../models/formateurModel");
const formationModel = require("../models/formationModel");

class FormateurService {
    // Create
    async createFormateur(req, res) {
        const { nom, prenom, age, dateDeNaissance, enseigne } = req.body;

        try {
            const linkedFormation = await formationModel.findById(enseigne);
            const newFormateur = new formateurModel({ nom, prenom, age, dateDeNaissance, enseigne: linkedFormation });
            newFormateur.save((err, docs) => (!err ? res.send(docs) : console.log("Error" + err)));
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }

    // Read
    async getAllFormateur(_, res) {
        try {
            const formateurs = await formateurModel.find();
            res.send(formateurs);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async getFormateurById(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(404).send("ID unknown : " + req.params.id);

        try {
            const formateur = await formateurModel.findById(req.params.id);
            res.send(formateur);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // Update
    async updateFormateurById(req, res) {
        const { id } = req.params;
        if (!ObjectID.isValid(id)) return res.status(404).send("ID unknown : " + id);

        try {
            const updateFormateur = req.body;

            if (req.body.enseigne) {
                const updateFormation = formationModel.findById(req.body.enseigne);
                updateFormateur.enseigne = updateFormation;
            }
            const formateur = await formateurModel.findByIdAndUpdate(id, { $set: updateFormateur }, { new: true });
            res.send(formateur);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
    // if (req.body.nom) updateFormateur.nom = req.body.nom;
    // if (req.body.prenom) updateFormateur.prenom = req.body.prenom;
    // if (req.body.age) updateFormateur.age = req.body.age;
    // if (req.body.dateDeNaissance) updateFormateur.dateDeNaissance = req.body.dateDeNaissance;

    // Delete
    async deleteFormateurById(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(404).send("ID unknown : " + req.params.id);

        try {
            const formateur = await formateurModel.findByIdAndDelete(req.params.id);
            res.send(formateur);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
}

module.exports = new FormateurService();
