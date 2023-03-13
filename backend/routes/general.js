const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let Admin = require("../models/admin.model");
let Customer = require("../models/customer.model");

router.route("/check-cookie").post((req, res) => {
    const token = req.cookies.jwt;

    if (token) { // check if json web token exists
        jwt.verify(token, 'kosi secret', async (err, decodedToken) => { // check if token is valid
            if (err) {
                console.log(err.message);
            } else {
                let customer = await Customer.findById(decodedToken.id);
                if (customer) {
                    console.log(customer);
                    res.status(200).send({ customer });
                } else {
                    let admin = await Admin.findById(decodedToken.id);
                    res.status(200).send({ admin });
                }
            }
        });
    } else {
        res.status(400).send("No tokens, no one is signed in");
    }
});

module.exports = router;
