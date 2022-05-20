import { ReactiveController, ReactiveControllerHost } from 'lit';
import { io } from 'socket.io-client';

const SOCKET_IO_URL = 'http://localhost:3000/';
const ROOM_NAME = 'elon/chat';
export class SocketController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private socket: any | undefined;
  messages: object[] = [];

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {
    this.openAndConnect();
  }

  private openAndConnect() {
    //connecting to Socket.IO chat server
    this.socket = io(SOCKET_IO_URL);

    this.socket.on('connect', function () {
      console.log('connected to chat server!');
    });

    this.socket.on('disconnect', function () {
      console.log('disconnected from chat server!');
    });

    // Listen to new incoming messages
    this.socket.on(ROOM_NAME, (data: any) => {
      this.messages = [...this.messages, data];

      console.log('recived new message:');
      console.log(data);
    });
  }

  sendMessage(msg: string) {
    if (msg !== '') {
      console.log(`send message:  ${msg}`);
      let name = ROOM_NAME;
      this.socket.emit(name, {
        text: msg,
        timestamp: new Date().toLocaleTimeString('it-IT')
      });
    }
  }

  hostDisconnected() {}
}
