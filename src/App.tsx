import './styles/main.scss';
import { Loading, Login, MessageList, SendMessageForm } from './components';
import { useContext } from 'react';
import { AuthContext } from './context/auth';

export function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  return (
    <main className={`content-wrapper ${user ? 'signed' : ''}`}>
      <MessageList />
      {user ? <SendMessageForm /> : <Login />}
    </main>
  );
}
