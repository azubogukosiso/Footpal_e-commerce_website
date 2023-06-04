const router = require("express").Router();
const jwt = require("jsonwebtoken");

let Admin = require("../models/admin.model");
let Order = require("../models/order.model");

// HANDLE ERRORS
const handleErrors = (err) => {
    const errors = { username: "", password: "" };

    // ADMIN VALIDATION ERRORS FOR SIGNING UP
    if (err.message.includes("Admin validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // INCORRECT USERNAME FOR LOGIN
    if (err.message.includes("Incorrect Username")) {
        errors.username = "The username is not correct";
        return errors;
    }

    // INCORRECT PASSWORD FOR LOGIN
    if (err.message.includes("Incorrect Password")) {
        errors.password = "The password is not correct";
        return errors;
    }

    return errors;
};


// CREATE COOKIE VALIDITY TIME
const maxAge = 3 * 24 * 60 * 60; // 3 DAYS
// FUNCTION FOR CREATING JWT
const createToken = (id) => {
    return jwt.sign({ id }, "kosi secret", {
        expiresIn: maxAge,
    });
};

// ============== LIST OF ROUTES ==============

// CREATES AN ADMIN
router.route("/signup").post(async (req, res) => {
    const admin_details = {
        username: req.body.username,
        password: req.body.password,
    }

    try {
        const admin = await Admin.create(admin_details);
        const token = createToken(admin._id);
        res.cookie("footpal_jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000 });
        res.status(201).send({ message: 'cookies sent, sign up successful' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
});

// SIGNS IN AN ADMIN
router.route("/signin").post(async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.login(username, password);
        const token = createToken(admin._id);
        res.cookie("footpal_jwt", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: maxAge * 1000 });
        res.status(200).send({ message: 'cookies sent, you are signed in' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
});

// CHECKS FOR THE PRESENCE OF A COOKIE - TO KNOW IF A USER IS LOGGED IN
router.route("/check-cookie").get((req, res) => {
    const token = req.cookies.jwt;

    try {
        jwt.verify(token, 'kosi secret', async (err, decodedToken) => {
            try {
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

// RETRIEVE ORDERS MADE
router.route("/orders").post((req, res) => {
    Order.find()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.send("No Orders for now");
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

// CONFIRM THE DELIVERY OF AN ITEM
router.route("/orders/:id").post((req, res) => {
    Order.findByIdAndUpdate(req.params.id, { delivery_status: "delivered" }, (err) => {
        if (err) {
            res.status(404).json("Error: " + err);
        } else {
            res.status(200).json("Order has been updated");
        }
    })
})

// DELETE AN ORDER
router.route("/orders/:id").delete((req, res) => {
    Order.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(404).json("Error: " + err);
        } else {
            res.status(200).json("Order has been deleted");
        }
    });
});

// LOGS OUT AN ADMIN
router.route("/logout").post((req, res) => {
    res.cookie("jwt", "", { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1 });
    res.status(200).send({ message: 'cookies sent, you have logged out' });
});

module.exports = router;
