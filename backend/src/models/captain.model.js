const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const captainSchema = new mongoose.Schema({
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
    socketId: {
        type: String,
    },
    status:{
        type: String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true,
        }
    },
    location:{
        ltd: {
            type: Number,
        },
        lng:{
            type: Number,
        }
    }

})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('captain', captainSchema);