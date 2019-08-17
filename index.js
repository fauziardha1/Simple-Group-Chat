// ///////////////////
//  starting ponts of app
// /////////////////////
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// ==== Configuration
app.set('port',process.env.PORT || 8000);

app.get('/',function(request,response) {
    response.render('index.ejs');
});

// dealing with socket.io
io.sockets.on('connection',function(socket) {
    // ketika ada user yang masuk / join ke chat
    socket.on('username',function(username) {
        socket.username = username;
        io.emit('is_online','🔵<i>' + socket.username + ' join the chat.. </i>');
    })
    // ketika ada user yang left
    socket.on('disconnect',function(username) {
        io.emit('is_online','🔴 <i>' + socket.username + ' left the chat.. </i>');
    });
    // ketika salah satu user mengirimkan pesan
    socket.on('chat_message',function(message) {
        io.emit('chat_message','<strong>' + socket.username + '</strong> : ' + message);
    });
});
const server = http.listen(app.get('port'),function() {
    console.log('listening on *:8000');
});