import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import { api } from '../services/api';

type Message = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string,
  }
}

export default function Login() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get('messages/last3').then((response: any) => setMessages(response.data));
  }, []);

  return (
    <div className="message-list-wrapper">
      <img src={ logo } alt="DoWhile 2021" />

      <ul className="message-list">
        { messages.map(({ text, id, user }) => (
          <li className="message" key={ id }>
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
