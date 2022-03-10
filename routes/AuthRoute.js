const AuthController = require('../controllers/authController');

const router = require('express').Router();

// Delete Book
router.delete('/:id', AuthController.deleteAuthor);
// Update Author
router.put('/:id', AuthController.updateAuthor);
// Add Author
router.post('/', AuthController.addAuthor);
// Get Detail
router.get('/:id', AuthController.getDetailAuthor);
// Get List
router.get('/', AuthController.getAllAuthor);

module.exports = router;