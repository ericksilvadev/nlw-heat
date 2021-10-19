import { VscGithubInverted } from 'react-icons/vsc'

export default function Login() {
  return (
    <div className="login-wrapper">
      <h2>Entre e compartilhe sua mensagem</h2>
      <button type="button" className="gh-btn">
        <VscGithubInverted /> Entrar com Github
      </button>
    </div>
  );
};
