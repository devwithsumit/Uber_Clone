const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name should contains atleast 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name should contains atleast 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    profilePic: {
        type: String,
    },
    socketID: {
        type: String
    }
})

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
module.exports = mongoose.model("User", UserSchema);