const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['borrowed', 'returned'],
        default: 'borrowed'
    }
}, { timestamps: true });

const Borrow = mongoose.model('Borrow', BorrowSchema);

module.exports = Borrow;