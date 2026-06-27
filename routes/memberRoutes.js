const express = require("express");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { getMembers, deleteMemberAccount, memberBorrowedBooks } = require("../controllers/memberController");
const router = express.Router();



//getMembers
router.get("/", protect, authorizeRoles('librarian'), getMembers);
//deleteMember
router.delete("/:id", protect, authorizeRoles('librarian'), deleteMemberAccount);
//MemberBorrowedBooks 
router.get('/me/books', protect, authorizeRoles('member'), memberBorrowedBooks);







module.exports = router;