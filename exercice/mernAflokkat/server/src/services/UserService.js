const ObjectID = require("mongoose").Types.ObjectId;

const userModel = require("../models/userModel");

class UserService {
    async createUser(req, res) {
        try {
            const newUser = await userModel.create(req.body);
            res.send(newUser);
        } catch (err) {
            res.status(409).json({ message: err.message });
        }
    }

    async getAllUser(_, res) {
        try {
            const users = await userModel.find().populate(["stagiaire", "formateur"]);
            res.status(200).json(users);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown");

        try {
            const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(user);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async deleteUser(req, res) {
        if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown");
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);
            res.send(user);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
}

module.exports = new UserService();
