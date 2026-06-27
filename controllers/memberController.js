const User = require('../models/User');
const Borrow = require('../models/Borrow');

//GetMembers 
const getMembers = async (req, res) => {
    try {
        const membersList = await User.find({ role: 'member' });

        if (!membersList) {
            return res.status(400).json({ message: "Members not found" });
        }
        return res.status(200).json({ message: "Members Fetched Successully", members: membersList });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


//DeleteMember 
const deleteMemberAccount = async (req, res) => {
    try {
        const memberId = req.params.id;
        const memberAccount = await User.findByIdAndDelete(memberId);

        if (!memberAccount) {
            return res.status(400).json({ message: "MemberAccount not found" });
        }
        return res.status(200).json({ message: "MemberAccount Deleted Successully", member: memberAccount });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

//MemberBorrowedBooks
const memberBorrowedBooks = async (req, res) => {
    try {
        const memberId = req.user.id;

        const BorrowedBooks = await Borrow.find({ memberId, status: 'borrowed' });

        if (!BorrowedBooks) {
            return res.status(404).json({ message: "This book is not currently marked as borrowed by this user" });
        }
        return res.status(200).json({ message: "Borrowed Books Fetched Successfully", BorrowedBooks: BorrowedBooks })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}







module.exports = { getMembers, deleteMemberAccount, memberBorrowedBooks }