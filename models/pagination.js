const mongoose = require("mongoose");

//BookSchema 
const paginationSchema = mongoose.Schema({
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 10
    },
}, { timestamps: true });
const Pagination = mongoose.model("Pagination", paginationSchema);
module.exports = Pagination;