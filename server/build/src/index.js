import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
io.on('connect', (socket) => {
  // Say Hi to all connected clients
  io.emit('broadcast', '[Server]: Welcome stranger!');
  socket.on('message', (msg) => {
    // console.log(`message received from user: ${msg.from}`);
    // console.log(`message received content: ${msg.content}`);
    io.emit('message', msg);
  });
  // Say Bye to all connected clients
  socket.on('disconnect', function () {
    io.emit('broadcast', '[Server]: Bye, bye, stranger!');
  });
});
const port = process.env.PORT || 8001;
app.set('port', port);
httpServer.listen(port, () => {
  console.log('listening on', port);
});
//# sourceMappingURL=index.js.map
