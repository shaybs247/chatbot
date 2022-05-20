export type Message = {
  text: string;
  senderId: string;
  username: string;
  type: 'bot' | 'chat-user' | 'me';
};
