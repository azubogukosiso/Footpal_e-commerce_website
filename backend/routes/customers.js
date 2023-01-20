const router = require("express").Router();
let Customer = require("../models/customer.model");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = { username: "", email: "", password: "" };

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


// create cookie validity time 
const maxAge = 3 * 24 * 60 * 60; // 3 days
// create jwt using fxn
const createToken = (id) => {
    console.log("This is the customer's id: "+ id);
    return jwt.sign({ id }, "kosi secret", {
        expiresIn: maxAge,
    });
};

// gets a list of all customer accounts in the database
router.route("/").get((req, res) => {
    Customer.find()
        .sort({ createdAt: -1 })
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json("Error: "+ err));
});

// adds a new customer account to the database
router.route("/add").post( async (req, res) => {
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
        res.send('Cookies sent');
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});


module.exports = router;
