
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

//router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
  console.log('connect');
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      console.log('disconnect');
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      
      var text = String(msg || '');

      if (!text)
        return;
      
      var data = {
        name: socket.name,
        text: text
      }
      
      broadcast('message', data, socket);
      messages.push(data);
    });

    socket.on('identify', function (name) {
        socket.name = String(name || 'Anonymous');
        updateRoster();
    });
    
});
  
  function broadcast(event, data, currentSocket) {
    sockets.forEach(function (socketInArray) {
      if (currentSocket != socketInArray){
        socketInArray.emit(event, data);  
      }
    });
  }

function updateRoster() {
  var onineUsers = sockets.map((socket)=>{
    var user = {
      name: socket.name
    }
    return user;
  });
   broadcast('roster', onineUsers);
}

server.listen(8081 || process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
