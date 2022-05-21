import { ReactiveController, ReactiveControllerHost } from 'lit';
import { io, Socket } from 'socket.io-client';
import { Message } from '../typings/types';

const SOCKET_IO_URL = 'http://localhost:3000/';
const ROOM_NAME = 'elon/chat';

export class SocketController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private socket: Socket | undefined;

  username = '';
  messages: Message[] = [];

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
    this.socket.on(ROOM_NAME, (data: Message) => {
      const type =
        data.senderId === 'bot'
          ? 'bot'
          : data.senderId === this.socket?.id
          ? 'me'
          : 'chat-user';

      this.messages = [...this.messages, { ...data, type }];
      this.host.requestUpdate();
    });
  }

  sendMessage({ msg }: { msg: string }) {
    if (msg !== '') {
      if (!this.username) {
        this.username = msg;
        this.socket?.emit(ROOM_NAME, {
          type: 'set-username',
          text: msg,
          username: this.username
        });
      } else {
        this.socket?.emit(ROOM_NAME, {
          type: 'message',
          text: msg,
          username: this.username
        });
      }
    }
  }

  hostDisconnected() {}
}
