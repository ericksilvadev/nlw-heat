import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import io from 'socket.io-client';
import { motion } from "framer-motion"
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

const socket = io(process.env.REACT_APP_API_URL || '');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    try {
      api.get<Message[]>('messages/last3').then((response: any) => setMessages(response.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prev) => [messagesQueue[0], prev[0], prev[1]].filter(Boolean));
        
        messagesQueue.shift();
      }
    }, 3000)

    return () => clearInterval(timer);
  }, [])

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: .5,
        delay: i / 4,
      },
    }),
    hidden: { opacity: 0, y: -20 },
  }

  return (
    <div className="message-list-wrapper">
      <img src={ logo } alt="DoWhile 2021" />

      <ul className="message-list">
        { messages.map(({ text, user }, i) => (
          <motion.li
            initial="hidden"
            custom={ i }
            animate="visible"
            variants={ variants }
            className="message"
            key={ i }
          >
            <p>{ text }</p>
            <div className="message-user">
              <div className="user-image">
                <img src={ user.avatar_url } alt={ user.name } />
              </div>
              <span>{ user.name }</span>
            </div>
          </motion.li>
        )) }
      </ul>
    </div>
  );
};
