const router = require("express").Router();

let Item = require("../models/item.model");
let Wish = require("../models/wish.model");

// ============== LIST OF ROUTES ==============

// GETS A LIST OF ALL ITEMS
router.route("/all").get((req, res) => {
	Item.find()
		.sort({ createdAt: -1 })
		.then(items => res.json(items))
		.catch(err => res.status(500).json("Error: " + err));
});

// GETS A LIST OF ITEMS FOR DISPLAY
router.route("/").get((req, res) => {
	Item.find()
		.sort({ createdAt: -1 })
		.limit(6)
		.then(items => res.json(items))
		.catch(err => res.status(500).json("Error: " + err));
});

// CREATES A NEW ITEM
router.route("/create").post(async (req, res) => {
	const newItem = new Item(req.body);
	try {
		const savedItem = await newItem.save();
		res.status(200).json(savedItem);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GETS A PARTICULAR EXERCISE USING ITS ID
router.route("/:id").get((req, res) => {
	Item.findById(req.params.id)
		.then(item => res.json(item))
		.catch((err) => res.status(404).json("Error: " + err));
});

// UPDATES AN ITEM
router.route("/update/:id").post((req, res) => {
	Item.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
		if (err) {
			res.status(404).json("Error: " + err);
		} else {
			res.status(200).json("Item has been successfully edited!");
		}
	});
});

// ADDS AN ITEM TO THE WISHLIST DATABASE
router.route("/add-to-wishlist").post(async (req, res) => {
	Wish.find({ mainId: req.body.mainId })
		.then(async (docs) => {
			if (docs) {
				let emailMatch = false;
				docs.map(doc => {
					if (doc.customerEmail === req.body.customerEmail) {
						emailMatch = true;
						return emailMatch;
					}
				})
				if (!emailMatch) {
					const wishItem = new Wish(req.body);
					try {
						const savedItem = await wishItem.save();
						res.status(200).json(savedItem);
					} catch (err) {
						res.send(err);
					}
				} else {
					res.send("Item already in wishlist");
				}
			} else {
				const wishItem = new Wish(req.body);
				try {
					const savedItem = await wishItem.save();
					res.status(200).json(savedItem);
				} catch (err) {
					res.send(err);
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
});

// GETS ALL ITEMS IN THE WISHLIST DATABASE
router.route("/wishlist").post((req, res) => {
	Wish.find({ customerEmail: req.body.email })
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

// REMOVES AN ITEM FROM THE WISHLIST DATABASE
router.route("/remove-wish/:id").delete((req, res) => {
	Wish.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.status(404).json("Error: " + err);
		} else {
			res.status(200).json("Item has been removed from wishlist!");
		}
	});
});

// GETS ALL ITEMS OF A CERTAIN CATEGORY
router.route("/category").post((req, res) => {
	const namesCaps = req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1);

	Item.find({ category: namesCaps })
		.then(items => {
			if (items.length > 0) {
				res.status(200).json(items);
			} else {
				res.send("There are no items of this category at the moment.");
			}
		}).catch(err => {
			res.status(500).send("Error: " + err);
		})
});

// DELETES AN ITEM
router.route("/delete/:id").delete((req, res) => {
	Item.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.status(404).json("Error: " + err);
		} else {
			res.status(200).json("Item has been deleted!");
		}
	});
});

module.exports = router;
