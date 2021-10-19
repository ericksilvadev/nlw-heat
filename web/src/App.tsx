import './styles/main.scss';
import { Login, MessageList } from './components';

export function App() {
  return (
    <main className="content-wrapper">
      <MessageList />
      <Login />
    </main>
  )
}
