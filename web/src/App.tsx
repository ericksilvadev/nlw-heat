import './styles/main.scss';
import { Login, MessageList, SendMessageForm } from './components';
import { useContext } from 'react';
import { AuthContext } from './context/auth';

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`content-wrapper ${ user ? 'signed' : '' }`}>
      <MessageList />
      { user ? <SendMessageForm /> : <Login /> }
    </main>
  )
}
