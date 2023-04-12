const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// ROUTE IMPORTS
const generalRouter = require("./routes/general");
const customersRouter = require("./routes/customers");
const adminRouter = require("./routes/admin");
const itemRouter = require("./routes/items");
const stripe = require("./routes/stripe");

// CONNECTION TO THE DATABASE
mongoose.connect("mongodb://localhost:27017/Footpal-Database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connection successful!");
    app.listen(5000, () => {
        console.log("server is running at port 5000")
    });
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/general", generalRouter);
app.use("/customers", customersRouter);
app.use("/admin", adminRouter);
app.use("/item", itemRouter);
app.use("/stripe", stripe);