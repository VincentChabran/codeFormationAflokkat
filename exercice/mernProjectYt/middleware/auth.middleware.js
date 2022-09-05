const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                next();
            } else {
                let user = UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(200).json("no tokon");
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("No token");
    }
};

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
