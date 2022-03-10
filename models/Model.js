const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 1024,
    },
    year: {
        type: Number,
    },
    // 1 tác giả có thể có nhiều cuốn sách. Nhưng 1 cuốn sách chỉ thuộc về 1 tác giả
    books: [
        {
            // Kiểu dữ liêu là ObjectId của model Book
            type: mongoose.Schema.Types.ObjectId,
            // Tham chiếu đến model Book
            ref: 'Book',
            required: true,
        }
    ]
});

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 1024,
    },
    publishedDate: {
        type: String,
    },
    genres: {
        // 1 cuốn sách có thể thuộc nhiều thể loại => Mảng String
        type: [String],
    },
    // 1 tác giả có thể có nhiều cuốn sách. Nhưng 1 cuốn sách chỉ thuộc về 1 tác giả
    author: {
        // Kiểu dữ liêu là ObjectId của model Author
        type: mongoose.Schema.Types.ObjectId,
        // Tham chiếu đến model Author
        ref: "Author",
        required: true,
    },
});

let Book = mongoose.model("Book", BookSchema);
let Author = mongoose.model("Author", AuthorSchema);

module.exports = { Book, Author };