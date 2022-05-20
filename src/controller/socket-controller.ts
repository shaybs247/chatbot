import { ReactiveController, ReactiveControllerHost } from 'lit';
import { io, Socket } from 'socket.io-client';

const SOCKET_IO_URL = 'http://localhost:3000/';
const ROOM_NAME = 'elon/chat';

type Message = {
  text: string;
  senderId: string;
  username: string;
};

export class SocketController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private socket: Socket | undefined;

  username = '';
  messages: Message[] = [
    {
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      username: 'kaki',
      senderId: 'kaki'
    },

    {
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      senderId: 'kaki',
      username: 'kaki'
    }
  ];

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
      this.host.requestUpdate();
      console.log('recived new message:');
      console.log(data);
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
