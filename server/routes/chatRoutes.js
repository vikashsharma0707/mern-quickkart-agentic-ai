// const express = require('express');
// const { chatToOrder } = require('../controllers/chatController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// router.post('/chat', protect, chatToOrder);

// module.exports = router;

const express = require('express');
const { chatToOrder } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/chat', protect, chatToOrder);   // ← Simple & clean

module.exports = router;