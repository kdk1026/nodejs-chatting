const express = require('express');
const router = express.Router();

// 채팅방 리스트
router.get('/roomList', function(req, res) {
    res.render('roomList.ejs');
});

// 채팅방
router.post('/room/:roomNumber', function(req, res) {
    let joinInfo = {};
    joinInfo.roomNumber = req.params.roomNumber;
    joinInfo.nickName = req.body.nickName;

    res.render('roomDetail.ejs', {joinInfo : joinInfo});
});

module.exports = router;