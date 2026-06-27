const express = require("express");
const router = express.Router();
const { createBook, getBooks, getBookDetails, updateBook, deleteBook, borrowBook, returnBook,getPaginationBooks } = require("../controllers/bookController");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

//CreateBook 
router.post("/", protect, authorizeRoles('librarian'), createBook);
//GetBooks 
router.get("/", protect, authorizeRoles('librarian', 'member'), getBooks);
//Pagination
router.get("/pagination",protect,authorizeRoles('member'),getPaginationBooks);
//GetBookDetails 
router.get('/:id', protect, authorizeRoles('librarian', 'member'), getBookDetails);
//UpdateBook 
router.put('/:id', protect, authorizeRoles('librarian'), updateBook);
//DeleteRoute
router.delete('/:id', protect, authorizeRoles('librarian'), deleteBook);
//BorrowBook
router.post("/:id/borrow", protect, authorizeRoles('member'), borrowBook);
//ReturnBook 
router.post("/:id/return", protect, authorizeRoles('member'), returnBook);


module.exports = router