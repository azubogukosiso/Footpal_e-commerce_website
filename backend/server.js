const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

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
    app.listen(PORT, () => {
        console.log("server has started")
    });
});

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://footpal.onrender.com"] }));
app.use(express.json({ limit: '10mb' }));

app.use("/general", generalRouter);
app.use("/customers", customersRouter);
app.use("/admin", adminRouter);
app.use("/item", itemRouter);
app.use("/stripe", stripe);