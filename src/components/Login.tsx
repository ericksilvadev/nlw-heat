import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../context/auth';

export default function Login() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className="login-wrapper">
      <h2>Entre e compartilhe sua mensagem</h2>
      <a href={signInUrl} className="gh-btn">
        <VscGithubInverted /> Entrar com Github
      </a>
    </div>
  );
}
