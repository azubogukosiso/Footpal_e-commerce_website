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

// gets a particular exercise using its id
router.route("/:id").get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch((err) => res.status(400).json("Error: " + err));
});

// updates an item
router.route("/update/:id").post((req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.json("Item has been successfully edited!");
        }
    });
});

module.exports = router;