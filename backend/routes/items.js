const router = require("express").Router();
let Item = require("../models/item.model");

// ---------- LIST OF ROUTES -------------
// gets a list of all items
router.route("/").get((req, res) => {
    Item.find()
        .sort({ createdAt: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(400).json("Error: " + err));
});


// create a new item
router.route("/create").post(async (req, res) => {
    const newItem = new Item(req.body);
    console.log(newItem);
    try {
        const savedItem = await newItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;