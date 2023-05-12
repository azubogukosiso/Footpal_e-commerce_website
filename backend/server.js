const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

// ROUTE IMPORTS
const generalRouter = require("./routes/general");
const customersRouter = require("./routes/customers");
const adminRouter = require("./routes/admin");
const itemRouter = require("./routes/items");
const stripe = require("./routes/stripe");

// CONNECTION TO THE DATABASE
mongoose.connect(process.env.MONGO_URL_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    app.listen(PORT);
});

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://footpal.onrender.com"] }));
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