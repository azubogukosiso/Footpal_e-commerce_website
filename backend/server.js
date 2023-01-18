const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// route imports
const customersRouter = require("./routes/customers");

// connection to the dbase
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

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/customers", customersRouter);