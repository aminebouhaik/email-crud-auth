const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post('/', emailController.createEmail);
router.get('/', emailController.getEmails);
router.put('/:id', emailController.updateEmail);
router.delete('/:id', emailController.deleteEmail);

module.exports = router;
