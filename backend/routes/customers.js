const router = require("express").Router();
let Customer = require("../models/customer.model");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = { email: "", password: "" };

    // duplicate email error code
    if (err.code === 11000) {
        errors.email = "That email is already registered, use another";
        return errors;
    }

    // user validation errors
    if (err.message.includes("Customer validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // incorrect email error for login
    if (err.message.includes("Incorrect Email")) {
        errors.email = "This email is not registered";
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
    console.log("This is the customer's id: "+ id);
    return jwt.sign({ id }, "kosi secret", {
        expiresIn: maxAge,
    });
};

// ---------- LIST OF ROUTES -------------
// gets a list of all customers
router.route("/").get((req, res) => {
    Customer.find()
        .sort({ createdAt: -1 })
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json("Error: "+ err));
});

// signs up a new customer
router.route("/signup").post( async (req, res) => {
    const customer_details = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    
    try{
        const customer = await Customer.create(customer_details);
        const token = createToken(customer._id);
        console.log("This is the token: "+ token);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000});
        res.status(201).send({ message: 'cookies sent, sign up successful' });
    } catch (err) {
        const errors = handleErrors(err);
        // console.log(errors);
        res.status(400).send({ errors });
    }
});

// signs in a customer
router.route("/signin").post( async (req, res) => {
    const { email, password } = req.body;

    try{
        const customer = await Customer.login(email, password);
        const token = createToken(customer._id);
        res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000});
        res.status(200).send({ message: 'cookies sent, you are signed in' });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).send({ errors });
    }
});

module.exports = router;
