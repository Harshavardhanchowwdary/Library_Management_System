const mongoose = require("mongoose");

//BookSchema 
const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10,13}$/, 'Please provide a valid 10 or 13 digit ISBN'],
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be negative'],
        default: 1
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Available quantity is required'],
        min: [0, 'Available quantity cannot be negative'],
        default: 1,
    }
}, { timestamps: true });
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;