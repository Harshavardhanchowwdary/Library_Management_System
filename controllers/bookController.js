const Book = require("../models/Book");
const User = require('../models/User');
const Borrow = require('../models/Borrow');
const Pagination = require("../models/pagination");

//createBook 
const createBook = async (req, res) => {
    try {
        const { title, author, isbn, category, quantity, availableQuantity } = req.body;

        if (!title?.trim() || !author?.trim() || !isbn?.trim() || !category?.trim() || !quantity || !availableQuantity) {
            return res.status(400).json({ message: "Fill all the required fields" });
        }
        const existingBook = await Book.findOne({ title });

        if (existingBook) {
            return res.status(400).json({ message: "This Book is Already Exists" })
        }
        if (quantity < availableQuantity) {
            return res.status(400).json({ message: "availabityQuantity is not greater than quantity" })
        }
        //NewBook 
        const newBook = new Book({ title, author, isbn, category, quantity, availableQuantity });

        await newBook.save();

        return res.status(201).json({ message: "Book Created SuccessFully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

//allBooks 
const getBooks = async (req, res) => {
    try {
        const BooksList = await Book.find();
        return res.status(200).json({ message: "Books Fetched Successfully", data: BooksList });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}




//getBookDetails 
const getBookDetails = async (req, res) => {
    try {
        const { BookId } = req.params.id;
        const BookDetails = await Book.findOne({ BookId });

        if (!BookDetails) {
            return res.status(400).json({ message: "Book doesn't exists" });
        }
        return res.status(200).json({ message: "Book Fetched Sucessfully", Book: BookDetails });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }


}


//UpdateBook 
const updateBook = async (req, res) => {
    try {
        const Bookid = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(Bookid, req.body);

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book Updated Successfully", Book: updatedBook });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

//Deletebook 
const deleteBook = async (req, res) => {
    try {
        const Bookid = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(Bookid);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book Deleted Successfully", Book: deletedBook });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}



//BorrowBook 
const borrowBook = async (req, res) => {
    try {
        const userID = req.user.id;
        const bookID = req.params.id;

        const existingBook = await Book.findById(bookID);

        if (!existingBook) {
            return res.status(500).json({ message: "Book Not Found", });
        }

        const bookAvailability = existingBook.availableQuantity;

        if (bookAvailability <= 0) {
            return res.status(500).json({ message: "Book is currently unavailable", });
        }

        const sameBook = await Borrow.findOne({ memberId: userID, bookId: bookID, status: 'borrowed' });

        if (sameBook) {
            return res.status(400).json({ message: "User already borrowed this book" });
        }


        const newBorrowBook = new Borrow({ memberId: userID, bookId: bookID });
        await newBorrowBook.save();

        await Book.findByIdAndUpdate(
            bookID,
            { $inc: { availableQuantity: -1 } },
            { runValidators: true }
        );
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            borrowData: newBorrowBook
        });



    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const returnBook = async (req, res) => {
    try {
        const userID = req.user.id;
        const bookID = req.params.id;


        const borrowedBook = await Borrow.findOne({ memberId: userID, bookId: bookID, status: 'borrowed' });

        if (!borrowedBook) {
            return res.status(500).json({ message: "member doesn't borrowed book" });
        }

        const bookReturned = await Borrow.findOne({ memberId: userID, bookId: bookID, status: 'returned' });

        if (bookReturned) {
            return res.status(500).json({ message: "member already returned book" });
        }

        const newReturnedBook = new Borrow({ memberId: userID, bookId: bookID });
        newReturnedBook.returnDate = new Date();
        newReturnedBook.status = 'returned';
        await newReturnedBook.save();

        await Book.findByIdAndUpdate(bookID,
            { $inc: { availableQuantity: +1 } },
            { runValidators: true }
        );

        return res.status(201).json({
            success: true,
            message: "Book Returned successfully",
            returnedData: newReturnedBook
        });


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}





const getPaginationBooks = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skipPage = (page - 1) * limit;

        console.log("Pagination",page);

        const books = await Book.find().skip(skipPage).limit(limit);
        const total = await Book.countDocuments();


        
        return res.status(200).json({
            currentPage:page,
            totalPages:Math.ceil(total/limit),
            totalBooks:total,
            Books:books,
            success: true,
            message: "Pagination added successfully",
        });


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}









module.exports = { createBook, getBooks, getBookDetails, updateBook, deleteBook, borrowBook, returnBook ,getPaginationBooks};