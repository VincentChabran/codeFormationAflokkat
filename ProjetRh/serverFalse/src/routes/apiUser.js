const ExpressPromiseRouter = require("express-promise-router");
const ObjectID = require("mongoose").Types.ObjectId;

const { selectNomById } = require("../services/dbConfig");
const userSchema = require("../models/userSchema");

const router = ExpressPromiseRouter();

router.get("/all", (_, res) => {
    userSchema.find((err, docs) => (!err ? res.send(docs) : console.log("Error" + err)));
});

router.get("/id", async (req, res) => {
    userSchema.findById(req.query.id, (err, docs) => (!err ? res.send(docs) : console.log(err)));
});

router.get("/nom/:id", async (req, res) => {
    const id = req.params.id;
    const nom = await selectNomById(id);
    res.status(200).json(nom);
});

// Create user en post, route = http://localhost:4000/apiUser
router.post("/", (req, res) => {
    const { login, password, nom } = req.body;

    const newUser = new userSchema({ login, password, nom });

    newUser.save((err, docs) => (!err ? res.send(docs) : console.log("Error creating new data" + err)));
});

router.put("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(400).send("ID unknow : " + id);

    const updateUser = {
        login: req.body.login,
        nom: req.body.nom,
    };

    userSchema.findByIdAndUpdate(id, { $set: updateUser }, (err, docs) =>
        !err ? res.send(docs) : console.log("Udpate error : " + err)
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(400).send("ID Unknow : " + id);

    userSchema.findByIdAndDelete(id, (err, docs) => (!err ? res.send(docs) : console.log("Delete error : " + err)));
});

module.exports = router;
