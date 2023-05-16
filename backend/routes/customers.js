const router = require("express").Router();
const jwt = require("jsonwebtoken");

let Customer = require("../models/customer.model");

// HANDLE ERRORS
const handleErrors = (err) => {
    const errors = { email: "", password: "" };

    // DUPLICATE EMAIL ERROR CODE - FOR SIGNING UP
    if (err.code === 11000) {
        errors.email = "That email is already registered, use another";
        return errors;
    }

    // CUSTOMER VALIDATION ERRORS - FOR SIGNING UP
    if (err.message.includes("Customer validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // INCORRECT EMAIL ERROR FOR LOGIN
    if (err.message.includes("Incorrect Email")) {
        errors.email = "This email is not registered";
        return errors;
    }

    // INCORRECT PASWORD ERROR FOR LOGIN
    if (err.message.includes("Incorrect Password")) {
        errors.password = "The password is not correct";
        return errors;
    }

    return errors;
};


// CREATE COOKIE VALIDITY TIME
const maxAge = 3 * 24 * 60 * 60; // 3 days
// create jwt using fxn
const createToken = (id) => {
    return jwt.sign({ id }, "kosi secret", {
        expiresIn: maxAge,
    });
};

// ============== LIST OF ROUTES ==============

// GETS A LIST OF ALL CUSTOMERS
router.route("/").get((req, res) => {
    Customer.find()
        .sort({ createdAt: -1 })
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json("Error: " + err));
});

// SIGNS UP A NEW CUSTOMER
router.route("/signup").post(async (req, res) => {
    const customer_details = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const customer = await Customer.create(customer_details);
        const token = createToken(customer._id);
        res.cookie("footpal_jwt", token, {
            httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000
        });
        res.status(201).send({ message: 'cookies sent, sign up successful' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
});

// SIGNS IN A CUSTOMER
router.route("/signin").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.login(email, password);
        const token = createToken(customer._id);
        res.cookie("footpal_jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000 });
        res.status(200).send({ message: 'cookies sent, you  are signed in' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
});

// LOGS OUT A CUSTOMER
router.route("/logout").post((req, res) => {
    res.cookie("footpal_jwt", "", { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1 });
    res.status(200).send({ message: 'cookies sent, you have logged out' });
});

module.exports = router;
