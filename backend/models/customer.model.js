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
            unique: [true, "This email exists already, enter another"],
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Minimum password length is 6 characters, this is too short"],
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


const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;