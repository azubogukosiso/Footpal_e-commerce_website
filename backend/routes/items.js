const router = require("express").Router();
let Item = require("../models/item.model");
let Wish = require("../models/wish.model");

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
            res.status(200).json("Item has been successfully edited!");
        }
    });
});

// adds an item to the wishlist database
router.route("/add-to-wishlist").post(async (req, res) => {
    const wishItem = new Wish(req.body);
    try {
        const savedItem = await wishItem.save();
        res.status(200).json(savedItem);
    } catch (err) {
        res.send(err);
    }
});

// gets all items in the wishlist database
router.route("/wishlist").post((req, res) => {
    Wish.find()
        .then(wishes => {
            if (wishes.length > 0) {
                res.status(200).json(wishes);
            } else {
                res.send("No Items in wishlist");
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});

// deletes an item
router.route("/delete/:id").delete((req, res) => {
    Item.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
            res.status(400).json("Error: " + err);
        } else {
            res.status(200).json("Item has been successfully deleted!");
        }
    });
});

module.exports = router;