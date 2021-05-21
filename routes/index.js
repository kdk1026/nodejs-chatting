const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/chat/roomList');
});

const chat = require('./chat');
router.use('/chat', chat);

module.exports = router;