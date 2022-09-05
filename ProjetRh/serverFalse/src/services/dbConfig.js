const mongoose = require("mongoose");
const User = require("../models/userSchema");

mongoose.connect("mongodb://localhost:27017/projetRh", (err) =>
    !err ? console.log("Connection MongoDb Ok") : console.log("Erreur Db Connection" + err)
);

//
//
//
//
//  ****************************************************** Test *********************************************

// *************************** Create ********************
const addUser = async (nom, prenom, login) => {
    const user = new User({
        nom: nom,
        prenom: prenom,
        login: login,
    });
    await user.save();
};

// **************************** Read **************************
const selectAllUser = async () => {
    mongoose.connect("mongodb://localhost:27017/projetRh");
    return await User.find();
};

const selectUserById = async (id) => {
    mongoose.connect("mongodb://localhost:27017/projetRh");
    return await User.findById(id);
};

const selectNomById = async (id) => {
    mongoose.connect("mongodb://localhost:27017/projetRh");
    return await User.findById(id).select("nom");
};

// ************************* Update ***************************
const updateUser = async (id, nom) => {
    await User.where({ _id: id }).updateOne({ nom: nom });
};

// *********************************** Delete ********************
const deleteUser = async (id) => {
    await User.deleteOne({ _id: id });
};

module.exports = { selectUserById, selectNomById };
