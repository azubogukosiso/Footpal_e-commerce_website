const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        itemImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;