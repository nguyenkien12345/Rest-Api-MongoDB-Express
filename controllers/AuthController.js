const { Author, Book } = require('../models/Model');

const AuthController = {
    addAuthor: async (req, res) => {
        try {
            let name = req.body.name;
            let year = req.body.year;
            let user = {
                name: name,
                year: year
            }
            const newAuthor = new Author(user);
            if (newAuthor) {
                await newAuthor.save();
                return res.status(200).json({
                    "data": [
                        {
                            "author": newAuthor,
                            "message": "Add Author Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Add Author Failure",
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

    getAllAuthor: async (req, res) => {
        try {
            // Nếu không có populate("books") thì khi lấy ra toàn bộ danh sách các authors thì trường books của từng author sẽ chỉ chứa mỗi cái id của các cuốn sách
            // Còn khi thêm populate("books") thì lúc này thì trường books của từng author sẽ hiển thị chi tiết các object book đó luôn chứ không chỉ đơn thuần là mỗi cái id
            const authors = await Author.find().populate("books");
            if (authors.length > 0) {
                return res.status(200).json({
                    "data": [
                        {
                            "authors": authors,
                            "message": "Get Authors Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Get Authors Failure",
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

    getDetailAuthor: async (req, res) => {
        try {
            // Khi thêm populate("books") thì lúc này thì trường books của author sẽ hiển thị chi tiết các object book đó luôn chứ không chỉ đơn thuần là mỗi cái id
            const author = await Author.findById(req.params.id).populate("books");
            if (author) {
                return res.status(200).json({
                    "data": [
                        {
                            "author": author,
                            "message": "Get Author Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({
                    "data": [
                        {
                            "message": "Get Author Failure",
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

    updateAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (author) {
                // Người dùng gửi lên trường gì thì update trường đó, còn những trường không gửi lên thì giữ nguyên
                const result = await Author.updateOne({ $set: req.body });
                return res.status(200).json({
                    "data": [
                        {
                            "Author": result,
                            "message": "Update Author Successfully",
                            "status": true
                        }
                    ]
                });
            }
            else {
                return res.status(400).json({ message: "Author Is Not Exists" });
            }
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },

    deleteAuthor: async (req, res) => {
        try {
            // Sau khi xóa đi author ta cũng phải đồng thời xóa luôn author của Book
            await Author.findByIdAndDelete(req.params.id);
            // Tìm id của author đã xóa và đồng thời gắn giá trị null cho filed author của Book
            await Book.updateMany({ author: req.params.id }, { author: null });
            return res.status(400).json({
                "message": "Delete Author Successfully",
                "status": true
            });
        }
        catch (err) {
            return res.status(400).json({ err: err });
        }
    },
}

module.exports = AuthController;