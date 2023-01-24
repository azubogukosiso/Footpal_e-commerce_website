const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
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
adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// for logging in the admin
adminSchema.statics.login = async function (username, password) {
    const admin = await this.findOne({ username });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password)
        if (auth) {
            return admin;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Username");
}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;