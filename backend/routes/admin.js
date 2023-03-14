const router = require("express").Router();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

let Admin = require("../models/admin.model");

// handle errors
const handleErrors = (err) => {
    console.log(err.message);
    const errors = { username: "", password: "" };

    // admin validation errors for signing up
    if (err.message.includes("Admin validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // incorrect username error for login
    if (err.message.includes("Incorrect Username")) {
        errors.username = "The username is not correct";
        return errors;
    }

    // incorrect pasword error for login
    if (err.message.includes("Incorrect Password")) {
        errors.password = "The password is not correct";
        return errors;
    }

    return errors;
};


// create cookie validity time 
const maxAge = 3 * 24 * 60 * 60; // 3 days
// create jwt using fxn
const createToken = (id) => {
    console.log("This is the admin's id: " + id);
    return jwt.sign({ id }, "kosi secret", {
        expiresIn: maxAge,
    });
};

// --------- LIST OF ROUTES ----------
// creates an admin
router.route("/signup").post(async (req, res) => {
    const admin_details = {
        username: req.body.username,
        password: req.body.password,
    }

    try {
        const admin = await Admin.create(admin_details);
        const token = createToken(admin._id);
        console.log("This is the token: " + token);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(201).send({ message: 'cookies sent, sign up successful' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
});

// signs in an admin
router.route("/signin").post(async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.login(username, password);
        const token = createToken(admin._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
        res.status(200).send({ message: 'cookies sent, you are signed in' });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).send({ errors });
    }
});

// checks for the presence of a cookie - to know if a user is logged in
router.route("/check-cookie").get((req, res) => {
    const token = req.cookies.jwt;
    console.log(token);

    try {
        jwt.verify(token, 'kosi secret', async (err, decodedToken) => {
            try {
                console.log(decodedToken.id);
                const admin = await Admin.findById(decodedToken.id);
                res.status(200).send({ admin });
            } catch (err) {
                res.status(400).send({ message: "you're logged out" });
            }
        })
    } catch (err) {
        res.status(400).send({ message: "you're logged out" });
    }
});

// logs out an admin
router.route("/logout").post((req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send({ message: 'cookies sent, you have logged out' });
});

module.exports = router;
