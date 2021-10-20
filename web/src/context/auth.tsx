import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode,
}

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fede7aded1a46c2c543e`;

  const signIn = async (code: string) => {
    const { data: { token, user } } = await api.post<AuthResponse>('authenticate', {
      code,
    });

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => setUser(response.data));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('code');

    if (hasGithubCode) {
      const [baseUrl, ghCode] = url.split('?code=');

      window.history.pushState({}, '', baseUrl);

      signIn(ghCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
