import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import io from 'socket.io-client';
import { api } from '../services/api';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] =[];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prev) => [messagesQueue[0], prev[0], prev[1]].filter(Boolean));
        messagesQueue.shift();
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get('messages/last3').then((response: any) => setMessages(response.data));
  }, []);

  return (
    <div className="message-list-wrapper">
      <img src={ logo } alt="DoWhile 2021" />

      <ul className="message-list">
        { messages.map(({ text, user, id }, i) => (
          <li className="message" key={ id || i }>
            <p>{ text }</p>
            <div className="message-user">
              <div className="user-image">
                <img src={ user.avatar_url } alt={ user.name } />
              </div>
              <span>{ user.name }</span>
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
};
