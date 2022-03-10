const BookController = require('../controllers/BookController');

const router = require('express').Router();

// Delete Book
router.delete('/:id', BookController.deleteBook);
// Update Book
router.put('/:id', BookController.updateBook);
// Add Book
router.post('/', BookController.addBook);
// Get Detail
router.get('/:id', BookController.getDetailBook);
// Get List
router.get('/', BookController.getAllBook);

module.exports = router;