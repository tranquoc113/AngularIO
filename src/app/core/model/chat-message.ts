export class Message {
  application: string;
  alert: string;
  sender: string;
  content: string;
  badge: number = 1;
  sound: string = 'default';
}
export class ChatMessage {
  application: string;
  organization: string;
  sender: string;
  sent: number;
  message: Message;
  messageType: string;
  alias: string[];
}
