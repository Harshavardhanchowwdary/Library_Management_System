const mongoose = require("mongoose");

//UserSchema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ["member", "librarian"]
    }
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);

module.exports = User;