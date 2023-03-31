const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishSchema = new Schema(
    {
        mainId: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
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
)

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;