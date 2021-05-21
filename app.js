const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const moment = require('moment');

const server = http.createServer(app);
const io = require('socket.io')(server);

const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')
app.use(router);

io.on('connection', function(socket) {
    socket.on('JOIN', function(data) {
        socket.join(data.room);

        const userCount = io.sockets.adapter.rooms.get(data.room).size;

        io.to(data.room).emit('join', {nickName : data.nickName, userCount : userCount });
    });

    socket.on('QUIT', function(data) {
        socket.leave(data.room);

        if ( io.sockets.adapter.rooms.get(data.room) != null ) {
            const userCount = io.sockets.adapter.rooms.get(data.room).size;
    
            io.to(data.room).emit('quit', {nickName : data.nickName, userCount : userCount });
        }
    });

    socket.on('MESSAGE', function(data) {
        const sendData = {
            nickName : data.nickName, 
            message : data.message,
            time : moment().locale('ko').format('LT')
        };

        io.to(data.room).emit('message', sendData);
    });

});

server.listen(8080, function() {
    console.log('start, express server on port 8080');
});