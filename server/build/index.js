'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var express = require('express');
var node_http_1 = require('node:http');
var socket_io_1 = require('socket.io');
var app = express();
var httpServer = (0, node_http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {});
io.on('connect', function (socket) {
  io.emit('broadcast', '[Server]: Welcome stranger!');
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
  socket.on('disconnect', function () {
    io.emit('broadcast', '[Server]: Bye, bye, stranger!');
  });
});
var port = process.env.PORT || 8001;
app.set('port', port);
httpServer.listen(port, function () {
  console.log('listening on', port);
});
//# sourceMappingURL=index.js.map
