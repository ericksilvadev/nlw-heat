import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../services/api';

type AuthResponse = {
  token: string,
  user: {
    id: string,
    avatar_url: string,
    nome: string,
    login: string,
  }
};

export default function Login() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fede7aded1a46c2c543e`;

  
  const signIn = async (code: string) => {
    const { data: { token, user } } = await api.post<AuthResponse>('authenticate', {
      code,
    })

    localStorage.setItem('@dowhile:token', token)

    console.log(user);
    
  }

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('code');

    if(hasGithubCode) {
      const [baseUrl, ghCode] = url.split('?code=');

      window.history.pushState({}, '', baseUrl);

      signIn(ghCode);
    }
  }, []);

  return (
    <div className="login-wrapper">
      <h2>Entre e compartilhe sua mensagem</h2>
      <a href={ signInUrl } type="button" className="gh-btn">
        <VscGithubInverted /> Entrar com Github
      </a>
    </div>
  );
};
