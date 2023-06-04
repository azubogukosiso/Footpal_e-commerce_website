const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Minimum password length is 6 characters. This is too short"],
        },
        profile_image: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: true,
    }
);

// fire before doc is saved to db (hash password)
customerSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// for logging in a customer
customerSchema.statics.login = async function (email, password) {
    const customer = await this.findOne({ email });
    if (customer) {
        const auth = await bcrypt.compare(password, customer.password);
        if (auth) {
            return customer;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
}

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;