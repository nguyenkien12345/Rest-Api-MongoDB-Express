const { Author, Book } = require('../models/Model');

const BookController = {
    addBook: async (req, res) => {
        try {
            // Lấy các dữ liệu từ form thông qua req.body
            const newBook = new Book(req.body);
            await newBook.save();
            if (newBook) {
                // Nếu mà mình có tác giả thì trước hết mình sẽ tìm tác giả đó và thêm cuốn sách vào tác giả này
                if (req.body.author) {
                    // Cách 1
                    // const author = await Author.find({ _id: req.body.author });
                    // Cách 2
                    const author = await Author.findById(req.body.author);
                    // Thêm id của cuốn sách vào field books của tác giả
                    await author.updateOne({ $push: { books: newBook._id } });
                }
                return res.status(200).json({
                    "data": [
                        {
                            "book": newBook,
                            "message": "Add Book Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Add Book Failure",
                            "status": false
                        }
                    ]
                });
            }
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },

    getAllBook: async (req, res) => {
        try {
            // Khi thêm populate("author") thì lúc này thì trường author của book sẽ hiển thị chi tiết object của author đó luôn chứ không chỉ đơn thuần là mỗi cái id
            const books = await Book.find().populate("author");
            if (books.length > 0) {
                return res.status(200).json({
                    "data": [
                        {
                            "books": books,
                            "message": "Get Books Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Get Books Failure",
                            "status": false
                        }
                    ]
                });
            }
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },

    getDetailBook: async (req, res) => {
        try {
            // Khi thêm populate("author") thì lúc này thì trường author của book sẽ hiển thị chi tiết object của author đó luôn chứ không chỉ đơn thuần là mỗi cái id
            const book = await Book.findById(req.params.id).populate("author");
            if (book) {
                return res.status(200).json({
                    "data": [
                        {
                            "book": book,
                            "message": "Get Book Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Get Book Failure",
                            "status": false
                        }
                    ]
                });
            }
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },

    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (book) {
                // Người dùng gửi lên trường gì thì update trường đó, còn những trường không gửi lên thì giữ nguyên
                const result = await book.updateOne({ $set: req.body });
                return res.status(200).json({
                    "data": [
                        {
                            "book": result,
                            "message": "Update Book Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({ message: "Book Is Not Exists" });
            }
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },

    deleteBook: async (req, res) => {
        try {
            // Sau khi xóa đi book ta cũng phải đồng thời xóa luôn book trong cái mảng books của Author
            await Book.findByIdAndDelete(req.params.id);
            // Tìm id của cuốn sách đã xóa và đồng thời lấy nó ra (dùng pull) khỏi mảng books của Author
            await Author.updateMany({ books: req.params.id }, { $pull: { books: req.params.id } });
            return res.status(400).json({
                "message": "Delete Book Successfully",
                "status": true
            });
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },
}

module.exports = BookController;