import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../context/auth';
import { api } from '../services/api';

export default function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [messageSentFeedback, setFeedback] = useState(false);

  const { user, signOut } = useContext(AuthContext);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log('enviou');

    setFeedback(true);

    setTimeout(() => setFeedback(false), 3000);

    try {
      await api.post('messages', { message });
    } catch (err) {
      console.log(err);
    }

    setMessage('');
  };

  return (
    <div className="form-container">
      {messageSentFeedback && (
        <span className="feedback">Mensagem enviada com sucesso!</span>
      )}
      <div className="message-form-wrapper">
        <button className="sign-out-btn" onClick={signOut}>
          <VscSignOut />
        </button>

        <header className="user-info">
          <div className="user-image">
            <img src={user?.avatar_url} alt={user?.name} />
          </div>
          <strong className="user-name">{user?.name}</strong>
          <span className="user-login">
            <VscGithubInverted />
            {user?.login}
          </span>
        </header>

        <form className="send-message-form" onSubmit={sendMessage}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            name="message"
            id="message"
            placeholder="Qual sua expectativa para o evento?"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <button type="submit">Enviar menssagem</button>
        </form>
      </div>
    </div>
  );
}
