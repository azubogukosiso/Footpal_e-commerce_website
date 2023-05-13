const router = require("express").Router();
const jwt = require("jsonwebtoken");

let Admin = require("../models/admin.model");
let Customer = require("../models/customer.model");

router.route("/check-cookie").post((req, res) => {
    const token = req.cookies.footpal_jwt;

    if (token) { // CHECK IF JSON WEB TOKEN EXISTS
        jwt.verify(token, 'kosi secret', async (err, decodedToken) => { // CHECK IF TOKEN IS VALID
            if (err) {
                console.log(err.message);
            } else {
                let customer = await Customer.findById(decodedToken.id);
                if (customer) {
                    res.status(200).send({ customer });
                } else {
                    let admin = await Admin.findById(decodedToken.id);
                    res.status(200).send({ admin });
                }
            }
        });
    } else {
        res.send("No tokens");
    }
});

module.exports = router;
